"""
Flask application for User Management SPA
Provides REST API endpoints to serve user data
"""
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# Test user data - will be replaced with actual API calls in the future
TEST_USERS = [
    {
        'id': 1,
        'firstName': 'John',
        'lastName': 'Doe',
        'email': 'john.doe@example.com',
        'phone': '+1 (555) 123-4567',
        'address': '123 Main St, New York, NY 10001'
    },
    {
        'id': 2,
        'firstName': 'Jane',
        'lastName': 'Smith',
        'email': 'jane.smith@example.com',
        'phone': '+1 (555) 234-5678',
        'address': '456 Oak Ave, Los Angeles, CA 90001'
    },
    {
        'id': 3,
        'firstName': 'Michael',
        'lastName': 'Johnson',
        'email': 'michael.johnson@example.com',
        'phone': '+1 (555) 345-6789',
        'address': '789 Pine Rd, Chicago, IL 60601'
    },
    {
        'id': 4,
        'firstName': 'Emily',
        'lastName': 'Davis',
        'email': 'emily.davis@example.com',
        'phone': '+1 (555) 456-7890',
        'address': '321 Elm St, Houston, TX 77001'
    },
    {
        'id': 5,
        'firstName': 'David',
        'lastName': 'Wilson',
        'email': 'david.wilson@example.com',
        'phone': '+1 (555) 567-8901',
        'address': '654 Maple Dr, Phoenix, AZ 85001'
    },
    {
        'id': 6,
        'firstName': 'Sarah',
        'lastName': 'Brown',
        'email': 'sarah.brown@example.com',
        'phone': '+1 (555) 678-9012',
        'address': '987 Cedar Ln, Philadelphia, PA 19101'
    },
    {
        'id': 7,
        'firstName': 'James',
        'lastName': 'Martinez',
        'email': 'james.martinez@example.com',
        'phone': '+1 (555) 789-0123',
        'address': '159 Birch Ct, San Antonio, TX 78201'
    },
    {
        'id': 8,
        'firstName': 'Lisa',
        'lastName': 'Anderson',
        'email': 'lisa.anderson@example.com',
        'phone': '+1 (555) 890-1234',
        'address': '753 Spruce Way, San Diego, CA 92101'
    }
]

@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory('static', path)

@app.route('/api/users', methods=['GET'])
def get_users():
    """
    Get list of all users
    In the future, this will make a request to Azure Cloud REST API
    """
    return jsonify(TEST_USERS)

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user by ID"""
    user = next((u for u in TEST_USERS if u['id'] == user_id), None)
    if user:
        return jsonify(user)
    return jsonify({'error': 'User not found'}), 404

if __name__ == '__main__':
    # Debug mode should be disabled in production
    # Set FLASK_DEBUG=0 or remove debug parameter for production deployment
    import os
    debug_mode = os.environ.get('FLASK_DEBUG', '1') == '1'
    app.run(debug=debug_mode, host='0.0.0.0', port=5000)
