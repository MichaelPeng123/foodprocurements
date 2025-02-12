from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from anthropic import Anthropic
from firebase_admin import credentials, firestore, storage, initialize_app
from dotenv import load_dotenv
import base64
import csv
import io
import os
import pandas as pd

# Load environment variables
load_dotenv()

# Initialize Firebase
cred = credentials.Certificate('/Users/mpeng/Desktop/Firebase_keys/python_key.json')
initialize_app(cred, {
    'storageBucket': os.getenv('REACT_APP_FIREBASE_STORAGE_BUCKET')
})

# Initialize Flask, Firestore, and Claude
app = Flask(__name__)
CORS(app)
db = firestore.client()
anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# Load XLSX reference file and convert to CSV
reference_csv_path = '/Users/mpeng/Desktop/Food_Price_Procurement_Project/backend/foodCodes/gpc_vals.csv'
df = pd.read_csv(reference_csv_path)
csv_buffer = io.StringIO()
df.to_csv(csv_buffer, index=False)
csv_base64 = base64.b64encode(csv_buffer.getvalue().encode()).decode('utf-8')
print(f"CSV file size: {len(csv_buffer.getvalue())} bytes")

# Create initial system context with CSV and wait for response
try:
    CLAUDE_SYSTEM_CONTEXT = anthropic.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4000,
        messages=[{
            "role": "user", 
            "content": [
                {
                    "type": "document",
                    "source": {
                        "type": "base64",
                        "media_type": "text/csv",
                        "data": csv_base64
                    }
                },
                {
                    "type": "text",
                    "text": "This is a reference CSV file containing GPC classification codes. Use this as context for future PDF parsing tasks. No need to do any classification right now."
                }
            ]
        }]
    )
    print("Language model initialized and ready")
except Exception as e:
    print(f"Error initializing language model: {str(e)}")
    raise

@app.route('/api/test')
def test_route():
    return jsonify({"message": "API is working!"})

@app.route('/api/data', methods=['POST'])
def receive_data():
    return jsonify({"received": request.json})

@app.route('/process-pdf', methods=['POST'])
def process_pdf():
    pdf_url = request.json.get('pdf_url')
    if not pdf_url:
        return jsonify({
            'status': 'error',
            'message': 'PDF URL not provided'
        })

    try:
        # Download and encode PDF
        response = requests.get(pdf_url)
        response.raise_for_status()
        base64_pdf = base64.b64encode(response.content).decode('utf-8')

        # Claude API prompt using the existing context
        # prompt = '''Using the reference spreadsheet provided earlier as context, parse this PDF document into a CSV format.
        # Output only the CSV data with no additional text or descriptions.

        # Use exactly these column headers:
        # Year,School District,Description,Family,Class,Price,Quantity,Serving Size (Per Quantity)

        # Requirements:
        # - Include every item from the document
        # - Use the reference spreadsheet to help classify items into appropriate families and classes
        # - Leave cells blank if data is not present
        # - Do not include any explanatory text
        # - Do not ask for confirmation
        # - Output only the CSV data starting with the header row
        # '''

        prompt = '''
        Parse and classify these products in the PDF using the GPC (Global Product Classification) system to generate standardized composite strings. 
        Use ONLY valid codes from the provided Excel file earlier - do not create or infer new codes. If there are less than 3 identified attributes, 
        use 00000000 as a placeholder.

        Format each entry as:
        Item #. PRODUCT NAME
        Description: [brief product description]
        Composite: [segmentCode]-[familyCode]-[classCode]-[brickCode]-[attribute1]-[attribute2]-[attribute3]

        Reference example:
        "SLICED APPLES" would be formatted as:
        Description: Fresh sliced apples
        Composite: 50000000-50100000-50102000-10000205-30002837-30003020-30000090
        
        - Include every item from the document
        - Use the reference spreadsheet to help classify the appropriate composite strings
        - Leave cells blank if data is not present
        - Do not include any explanatory text
        - Do not ask for confirmation
        - Output only the CSV data starting with the header row
        '''

        # Process with Claude API using the existing context
        message = anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4000,
            messages=[
                {"role": "assistant", "content": CLAUDE_SYSTEM_CONTEXT.content[0].text},
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "document",
                            "source": {
                                "type": "base64",
                                "media_type": "application/pdf",
                                "data": base64_pdf
                            }
                        },
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ]
        )

        if not message or not message.content:
            raise ValueError("Invalid or empty response from Claude API")

        csv_content = message.content[0].text
        csv_filename = os.path.join(os.path.expanduser("~/Desktop"), "converted_document.csv")

        return jsonify({
            'status': 'success',
            'message': 'Processing complete',
            'csv_content': csv_content,
            'files': {
                'pdf': pdf_url,
                'csv': csv_filename
            }
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/get-csv')
def get_csv():
    try:
        csv_filename = request.args.get('csvFileName')
        if not csv_filename:
            return jsonify({
                'status': 'error',
                'message': 'No CSV filename provided'
            }), 400

        # Download and parse CSV from Firebase
        bucket = storage.bucket()
        blob = bucket.blob(f'csvs/{csv_filename}')
        csv_content = blob.download_as_string().decode('utf-8')
        csv_file = io.StringIO(csv_content)
        data = list(csv.reader(csv_file))

        return jsonify({
            'status': 'success',
            'data': data
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/save-csv', methods=['POST'])
def save_csv():
    try:
        data = request.json['data']
        csv_filename = request.json['csvFileName']

        # Create and upload CSV to Firebase
        csv_buffer = io.StringIO()
        csv_writer = csv.writer(csv_buffer)
        csv_writer.writerows(data)
        
        bucket = storage.bucket()
        blob = bucket.blob(f'csvs/{csv_filename}')
        blob.upload_from_string(csv_buffer.getvalue(), content_type='text/csv')

        return jsonify({
            'status': 'success',
            'message': 'CSV saved successfully to Firebase'
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5005)