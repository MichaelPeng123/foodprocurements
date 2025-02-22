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


app = Flask(__name__)
CORS(app)  # This allows your React frontend to make requests

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

        prompt = '''Parse this entire PDF document into a CSV format immediately. Output only the CSV data with no additional text or descriptions.

        1. Description (The food item name)
        2. Total Price (for the quantity purchased)
        3. Quantity 
        4. Pack Size (Number of serving size per quantity)
        5. Price Per Quantity (The price at which the school purchased each quantity)
        7. Serving Size (standardized values listed below, classified by the item description)
        8. Price Per Serving Size (calculated by (Total Price) / (Quantity * Pack Size))

        The following are the standardized serving sizes for each category of food item:
        Fruit: 1 cup or 2 oz or 1/8th lb
        Vegetable: 1 cup or 2 oz or 1/8th lb
        Grains: 2 oz or 1/8 lb
        Meat/Meat alternative: 2 oz or 1/8 lb
        Fluid Milk: 1 cup or 2 oz

        Requirements:
        - Include every item from the document
        - Leave cells blank if data is not present
        - For values that are not fully calculated out with notations like #, CT, BUNCH, EACH, division signs etc, simplify the value to the standarized label
        - Do not include any explanatory text
        - Do not ask for confirmation
        - Output only the CSV data starting with the header row'''

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

        # Get bucket and download CSV content
        bucket = storage.bucket()
        blob = bucket.blob(f'csvs/{csv_filename}')
        
        # Download as string
        csv_content = blob.download_as_string().decode('utf-8')
        
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

if __name__ == '__main__':
    app.run(debug=True, port=5005)