# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

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

if __name__ == '__main__':
    app.run(debug=True, port=5005)