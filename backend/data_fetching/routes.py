import os
from flask import Blueprint, request, jsonify
from .supabase import supabase
from .csv_utils import parse_csv_content, write_csv_content
from .firebase import bucket

data_fetching_bp = Blueprint('data_fetching', __name__)

@data_fetching_bp.route('/api/test', methods=['GET'])
def test_route():
    print("Hello!")
    return jsonify({"message": "API is working!"})

@data_fetching_bp.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"received": data})

@data_fetching_bp.route('/get-csv', methods=['GET'])
def get_csv():
    try:
        csv_filename = request.args.get('csvFileName')
        if not csv_filename:
            return jsonify({'status': 'error', 'message': 'No CSV filename provided'}), 400
        response = supabase.storage.from_('food-documents').download(f'csvs/{csv_filename}')
        csv_content = response.decode('utf-8')
        data = parse_csv_content(csv_content)
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@data_fetching_bp.route('/save-csv', methods=['POST'])
def save_csv():
    try:
        data = request.json['data']
        csv_filename = request.json['csvFileName']
        csv_content = write_csv_content(data)
        blob = bucket.blob(f'csvs/{csv_filename}')
        blob.upload_from_string(csv_content, content_type='text/csv')
        return jsonify({'status': 'success', 'message': 'CSV saved successfully to Firebase'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@data_fetching_bp.route('/api/food-index', methods=['GET'])
def get_food_index():
    try:
        food_index_path = os.path.join(os.path.dirname(__file__), '../foodCodes/food_index.txt')
        with open(food_index_path, 'r') as f:
            food_index_content = f.read()
        food_index_data = []
        for line in food_index_content.strip().split('\n'):
            if line.strip():
                parts = line.split(':', 1)
                if len(parts) == 2:
                    code, description = parts
                    food_index_data.append({'code': code.strip(), 'description': description.strip()})
                else:
                    food_index_data.append({'text': line.strip()})
        return jsonify({'status': 'success', 'data': food_index_data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500 