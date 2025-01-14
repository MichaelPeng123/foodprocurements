# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import PyPDF2
# import firebase_admin
# from firebase_admin import credentials

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
    print(data)
    return "endpoint reached!"

# def download_and_parse_pdf(pdf_url):
#     try:
#         # Download PDF from URL
#         response = requests.get(pdf_url)
#         response.raise_for_status()  # Raise an exception for bad status codes
        
#         # Create a file-like object from the downloaded content
#         pdf_file = io.BytesIO(response.content)
        
#         # Create PDF reader object
#         pdf_reader = PyPDF2.PdfReader(pdf_file)
        
#         # Extract text from all pages
#         text_content = []
#         for page in pdf_reader.pages:
#             text_content.append(page.extract_text())
        
#         return {
#             'status': 'success',
#             'num_pages': len(pdf_reader.pages),
#             'content': text_content
#         }
        
#     except requests.exceptions.RequestException as e:
#         return {
#             'status': 'error',
#             'error': f'Failed to download PDF: {str(e)}'
#         }
#     except PyPDF2.PdfReadError as e:
#         return {
#             'status': 'error',
#             'error': f'Failed to parse PDF: {str(e)}'
#         }
#     except Exception as e:
#         return {
#             'status': 'error',
#             'error': f'Unexpected error: {str(e)}'
#         }

# @app.route('/process-pdf', methods=['POST'])
# def process_pdf():
#     data = request.json
    
#     print(data)
    
#     if not data or 'pdf_url' not in data:
#         return jsonify({
#             'status': 'error',
#             'error': 'PDF URL not provided in request'
#         }), 400
    
#     pdf_url = data['pdf_url']
#     result = download_and_parse_pdf(pdf_url)
    
#     print("PDF Processing Result:")
#     print(f"Status: {result['status']}")
#     if result['status'] == 'success':
#         print(f"Number of pages: {result['num_pages']}")
#         print("\nContent:")
#         for i, page_content in enumerate(result['content'], 1):
#             print(f"\n--- Page {i} ---")
#             print(page_content)
#     else:
#         print(f"Error: {result['error']}")
    
#     return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5005)