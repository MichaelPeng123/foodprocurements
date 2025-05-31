from flask import Blueprint, request, jsonify
import io
from datetime import datetime
from claude_prompting.batch_processor import process_batch_from_urls
from data_fetching.supabase import supabase

claude_prompting_bp = Blueprint('claude_prompting', __name__)

@claude_prompting_bp.route('/process-pdf', methods=['POST'])
def process_pdf():
    try:
        data = request.json
        file_urls = data.get('file_urls', [])
        if not file_urls or not isinstance(file_urls, list):
            return jsonify({'status': 'error', 'message': 'file_urls must be a list of URLs (PDFs and/or images)'}), 400

        # Process all files (PDFs + images) using the batch processor
        combined_csv = process_batch_from_urls(file_urls)
        if not combined_csv.strip():
            return jsonify({'status': 'error', 'message': 'No CSV output generated'}), 500

        # Create a timestamped filename
        csv_filename = f"processed_{datetime.now().strftime('%Y%m%d%H%M%S')}.csv"

        # Upload CSV bytes directly to Supabase
        csv_bytes = combined_csv.encode('utf-8')
        supabase.storage.from_('food-documents').upload(f'csvs/{csv_filename}', csv_bytes)

        # Get the public URL of the uploaded CSV
        csv_url = supabase.storage.from_('food-documents').get_public_url(f'csvs/{csv_filename}')

        # Return response with CSV content + file info
        return jsonify({
            'status': 'success',
            'message': 'Processing complete',
            'csv_content': combined_csv,
            'files': {
                'inputs': file_urls,
                'csv': csv_url
            },
            'csvFileName': csv_filename,
            'csvUrl': csv_url
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

# ================== Old Code ==================
# @claude_prompting_bp.route('/process-pdf', methods=['POST'])
# def process_pdf():
#   prompt = '''Parse this entire PDF document into a CSV format immediately. Do not ask to continue and finish the whole file. Output only the CSV data with no additional text or descriptions.

#    1. Description (The food item name)
#    2. Price (for the quantity purchased. This is not the total amount spent. This is the average price per unit or price per unit)
#    3. Quantity
#    4. Pack Size (May be in the form of Pack/SizeUOM)
#    5. Pack (The first part of Pack Size without the middle divider)
#    6. Size (The second part of Pack Size without the middle divider)
#    7. UOM (This is the Units ex. OZ, LB, CT)
#    8. Total Price. This is Equal to Price * Quantity
#    9. Price Per Pack. This is equal to Price / Pack
#    10. Price Per Pack Size. This is equal to Price / (Pack * Size)
#    11. Price Per Pound. This is currently a filler column. Insert a random value between 2 and 15
#    12. Foodcode (referenced from the food index text file attatched, map it to the most probable category based on item description)

#    Other Requirements:
#    - Do not include dollar signs
#    - These values are not dates. Do not record them as such.
#    - Do not include any explanatory text
#    - Include every item from the document
#    - Include every item in a new line so it can be parsed properly
#    - If there is no middle divider in Pack Size or there is only one number, fill Pack in with a 1, fill Size in with the number, and fill UOM with the units
#    - Leave cells blank if data is not present
#    - For values that are not fully calculated out with notations like #, CT, BUNCH, EACH, division signs etc, simplify the value to the standardized label   
#    - Determine the total number of rows in the document
#    - Do not stop until you have reached the last row in the document
#    - Display every row that is processed. Do not truncate any rows.
#    - Do not ask for confirmation. Proceed with processing the remaining rows
#    - Output just the CSV data with the headers'''
#   data = request.json
#   pdf_url = data.get('pdf_url')
#   if not pdf_url:
#    return jsonify({'status': 'error', 'message': 'PDF URL not provided'})
#   try:
#    food_index_path = os.path.join(os.path.dirname(__file__), '../foodCodes/food_index.txt')
#    with open(food_index_path, 'r') as f:
#        food_index_content = f.read()
#    csv_content = process_pdf_with_claude(pdf_url, food_index_content, prompt)
#    desktop_path = os.path.expanduser("~/Desktop")
#    csv_filename = os.path.join(desktop_path, "converted_document.csv")
#    return jsonify({
#        'status': 'success',
#        'message': 'Processing complete',
#        'csv_content': csv_content,
#        'files': {
#            'pdf': pdf_url,
#            'csv': csv_filename
#    }
#        })
#except Exception as e:
#    return jsonify({'status': 'error', 'message': str(e)}), 500 