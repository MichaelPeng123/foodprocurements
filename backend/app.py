# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import PyPDF2
from dotenv import load_dotenv
import os
from anthropic import Anthropic
import io
import base64
import csv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import storage
from supabase import create_client

# Initialize Firebase with your service account credentials
cred = credentials.Certificate('/Users/mpeng/Desktop/Firebase_keys/python_key.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': os.getenv('REACT_APP_FIREBASE_STORAGE_BUCKET')
})

# Load environment variables
load_dotenv()

db = firestore.client()

# Initialize Anthropic client
anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

print(dir(anthropic))

app = Flask(__name__)
CORS(app)  # This allows your React frontend to make requests

# Initialize Supabase client
supabase_url = os.getenv('REACT_APP_SUPABASE_URL')
supabase_key = os.getenv('REACT_APP_SUPABASE_KEY')
supabase = create_client(supabase_url, supabase_key)

# Example route
@app.route('/api/test', methods=['GET'])
def test_route():
    print("Hello!")
    return jsonify({"message": "API is working!"})

# Example POST route
@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"received": data})

@app.route('/process-pdf', methods=['POST'])
def process_pdf():
    data = request.json 
    pdf_url = data.get('pdf_url')
    
    if not pdf_url:
        return jsonify({
            'status': 'error',
            'message': 'PDF URL not provided'
        })

    try:
        # Download PDF from URL
        print("Downloading PDF from URL: ", pdf_url)
        response = requests.get(pdf_url)
        response.raise_for_status()
        
        # Encode PDF directly from response content
        print("Encoding PDF...")
        base64_pdf = base64.b64encode(response.content).decode('utf-8')
        print("PDF encoded successfully")

        # Read the food index file
        food_index_path = os.path.join(os.path.dirname(__file__), 'foodCodes/food_index.txt')
        with open(food_index_path, 'r') as f:
            food_index_content = f.read()

        prompt = '''Parse this entire XLSX file or PDF document into a CSV format immediately. Output only the CSV data with no additional text or descriptions.

        1. Description (The food item name)
        2. Price (for the quantity purchased. This is not the total amount spent. This is the average price per unit or price per unit)
        3. Quantity
        4. Pack Size (May be in the form of Pack/SizeUOM)
        5. Pack (The first part of Pack Size without the middle divider)
        6. Size (The second part of Pack Size without the middle divider)
        7. UOM (This is the Units ex. OZ, LB, CT)
        8. Total Price. This is Equal to Price * Quantity
        9. Price Per Pack. This is equal to Price / Pack
        10. Price Per Pack Size. This is equal to Price / (Pack * Size)
        11. Price Per Pound. This is currently a filler column. Insert a random value between 2 and 15
        12. Foodcode (referenced from the food index text file attatched, map it to the most probable category based on item description)


        Other Requirements:
        - Do not include dollar signs
        - These values are not dates. Do not record them as such.
        - Do not include any explanatory text
        - Include every item from the document
        - Include every item in a new line so it can be parsed properly
        - If there is no middle divider in Pack Size or there is only one number, fill Pack in with a 1, fill Size in with the number, and fill UOM with the units
        - Leave cells blank if data is not present
        - For values that are not fully calculated out with notations like #, CT, BUNCH, EACH, division signs etc, simplify the value to the standardized label   
        - Determine the total number of rows in the document
        - Do not stop until you have reached the last row in the document
        - Display every row that is processed. Do not truncate any rows.
        - Do not ask for confirmation. Proceed with processing the remaining rows
        - Output just the CSV data with the headers'''

        # Send to Claude API
        print("Sending to Claude API...")
        message = anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=4000,
            messages=[{
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
                        "text": food_index_content
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }]
        )
        
        # Validate Claude's response
        if not message or not message.content:
            raise Exception("Invalid or empty response from Claude API")
            
        csv_content = message.content[0].text
        print("CSV content received from Claude")
        
        # Save CSV file
        desktop_path = os.path.expanduser("~/Desktop")
        csv_filename = os.path.join(desktop_path, "converted_document.csv")
        # with open(csv_filename, 'w') as f:
        #     f.write(csv_content)
        print("CSV file saved successfully")
        
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
        print(f"Error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/get-csv', methods=['GET'])
def get_csv():
    try:
        csv_filename = request.args.get('csvFileName')
        if not csv_filename:
            return jsonify({
                'status': 'error',
                'message': 'No CSV filename provided'
            }), 400

        # Get CSV content from Supabase storage using the food-documents bucket
        # and the csvs/ directory path
        response = supabase.storage.from_('food-documents').download(f'csvs/{csv_filename}')
        
        # Decode the response to a string
        csv_content = response.decode('utf-8')
        
        # Parse CSV content
        csv_file = io.StringIO(csv_content)
        csv_reader = csv.reader(csv_file)
        data = list(csv_reader)

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
        print("Starting save_csv function...")
        
        # Get data from request
        data = request.json['data']
        csv_filename = request.json['csvFileName']
        print(f"Received data and filename: {csv_filename}")
        
        # Create CSV content in memory
        csv_buffer = io.StringIO()
        csv_writer = csv.writer(csv_buffer)
        csv_writer.writerows(data)
        csv_content = csv_buffer.getvalue()
        print("Created CSV content in memory")
        
        # Get bucket and upload
        bucket = storage.bucket()
        blob = bucket.blob(f'csvs/{csv_filename}')
        print(f"Created blob reference: csvs/{csv_filename}")
        
        blob.upload_from_string(csv_content, content_type='text/csv')
        print("Successfully uploaded CSV to Firebase")
        
        return jsonify({
            'status': 'success',
            'message': 'CSV saved successfully to Firebase'
        })
    except Exception as e:
        print(f"Error saving CSV: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/food-index', methods=['GET'])
def get_food_index():
    try:
        # Read the food index file
        food_index_path = os.path.join(os.path.dirname(__file__), 'foodCodes/food_index.txt')
        with open(food_index_path, 'r') as f:
            food_index_content = f.read()
        
        # Parse the food index content
        # Assuming each line is in the format "code:description" or similar
        food_index_data = []
        for line in food_index_content.strip().split('\n'):
            if line.strip():  # Skip empty lines
                parts = line.split(':', 1)  # Split on first colon
                if len(parts) == 2:
                    code, description = parts
                    food_index_data.append({
                        'code': code.strip(),
                        'description': description.strip()
                    })
                else:
                    # Handle lines without the expected format
                    food_index_data.append({
                        'text': line.strip()
                    })
        
        return jsonify({
            'status': 'success',
            'data': food_index_data
        })
        
    except Exception as e:
        print(f"Error getting food index: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5005)