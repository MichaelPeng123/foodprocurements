import os
from flask import jsonify
from anthropic import Anthropic
import base64
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def process_pdf_with_claude(pdf_url, food_index_content, prompt):
    # Download PDF from URL
    response = requests.get(pdf_url)
    response.raise_for_status()
    base64_pdf = base64.b64encode(response.content).decode('utf-8')

    anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
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
    if not message or not message.content:
        raise Exception("Invalid or empty response from Claude API")
    return message.content[0].text

def process_pdf_endpoint(request, prompt):
    data = request.json
    pdf_url = data.get('pdf_url')
    if not pdf_url:
        return jsonify({'status': 'error', 'message': 'PDF URL not provided'})
    try:
        food_index_path = os.path.join(os.path.dirname(__file__), '../foodCodes/food_index.txt')
        with open(food_index_path, 'r') as f:
            food_index_content = f.read()
        csv_content = process_pdf_with_claude(pdf_url, food_index_content, prompt)
        desktop_path = os.path.expanduser("~/Desktop")
        csv_filename = os.path.join(desktop_path, "converted_document.csv")
        # Optionally save the file
        # with open(csv_filename, 'w') as f:
        #     f.write(csv_content)
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
        return jsonify({'status': 'error', 'message': str(e)}), 500 