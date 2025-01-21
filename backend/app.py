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

# Load environment variables
load_dotenv()

# Initialize Anthropic client
anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

# cred = credentials.Certificate("path/to/serviceAccountKey.json")
# firebase_admin.initialize_app(cred)


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

        Use exactly these column headers:
        Year,School District,Description,Family,Class,Price,Quantity,Serving Size (Per Quantity)

        Requirements:
        - Include every item from the document
        - Leave cells blank if data is not present
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
        with open(csv_filename, 'w') as f:
            f.write(csv_content)
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
        csv_path = os.path.expanduser("~/Desktop/converted_document.csv")
        with open(csv_path, 'r') as file:
            csv_reader = csv.reader(file)
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
        data = request.json['data']
        csv_path = os.path.expanduser("~/Desktop/converted_document.csv")
        with open(csv_path, 'w', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerows(data)
        return jsonify({
            'status': 'success',
            'message': 'CSV saved successfully'
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5005)