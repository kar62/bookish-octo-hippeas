# User Management SPA Application

A modern Single Page Application (SPA) for managing and displaying user information, built with Python Flask backend and vanilla JavaScript frontend.

## Features

- **RESTful API**: Python Flask backend providing user data endpoints
- **Modern UI**: Responsive, card-based user interface
- **Search Functionality**: Real-time search across user data
- **Test Data**: Pre-populated with 8 test users (ready for Azure Cloud API integration)
- **User Information**: Displays first name, last name, address, email, and phone number
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## Project Structure

```
bookish-octo-hippeas/
├── app.py                 # Flask backend application
├── requirements.txt       # Python dependencies
├── static/               # Frontend files
│   ├── index.html       # Main HTML page
│   ├── styles.css       # CSS styling
│   └── app.js           # JavaScript application logic
├── docs/                # Documentation files
└── README-APP.md        # This file
```

## Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd bookish-octo-hippeas
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

The application will start on port 5000 by default.

## API Endpoints

### GET /api/users
Returns a list of all users.

**Response Example**:
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Main St, New York, NY 10001"
  },
  ...
]
```

### GET /api/users/<id>
Returns a specific user by ID.

**Response Example**:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, New York, NY 10001"
}
```

## Test Data

The application currently uses test data defined in `app.py`. The TEST_USERS array contains 8 sample users with realistic information including:

- First and Last Name
- Email Address
- Phone Number
- Physical Address

## Future Integration

The application is designed to be easily integrated with an Azure Cloud REST API. To switch from test data to a real API:

1. Update the `get_users()` function in `app.py` to make HTTP requests to your Azure endpoint
2. Add necessary authentication/authorization headers
3. Handle error responses appropriately
4. Update the TEST_USERS constant or remove it once the API integration is complete

Example integration:
```python
import requests

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        response = requests.get('https://your-azure-api.azurewebsites.net/users')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500
```

## Development

### Running in Debug Mode
The application runs in debug mode by default during development. This enables:
- Auto-reload on code changes
- Detailed error messages
- Interactive debugger

For production, set `debug=False` in `app.py`.

### CORS Configuration
Cross-Origin Resource Sharing (CORS) is enabled to allow frontend-backend communication during development.

## Technologies Used

- **Backend**: Python 3, Flask 3.0, Flask-CORS
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful architecture

## Security Notes

- Input sanitization is implemented in the frontend (XSS prevention)
- CORS is currently open for development - restrict in production
- Add authentication/authorization before deploying to production
- Use HTTPS in production environments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See LICENSE file for details.

## Support

For issues or questions, please open an issue in the repository.
