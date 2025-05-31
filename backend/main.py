from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Data fetching modules
from data_fetching.firebase import db, bucket
from data_fetching.supabase import supabase
from data_fetching.csv_utils import parse_csv_content, write_csv_content
from data_fetching.routes import data_fetching_bp

# Claude prompting
# from claude_prompting.claude_api import process_pdf_with_claude, process_pdf_endpoint

# Query filtering
from query_filtering.routes import query_filtering_bp
from claude_prompting.routes import claude_prompting_bp

app = Flask(__name__)
CORS(app)
app.register_blueprint(data_fetching_bp)
app.register_blueprint(query_filtering_bp)
app.register_blueprint(claude_prompting_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5005)
