# Flask E-Por Website

A Flask-based web application for E-Por.

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/taniyanegi/e-por.git
cd e-por
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the root directory and add your environment variables.

5. Run the application:
```bash
flask run
```

## Development

- The application is built using Flask 3.0.2
- Uses Flask-Mail for email functionality
- Environment variables are managed using python-dotenv

## Deployment

### GitHub Pages Deployment
This application is automatically deployed to GitHub Pages using GitHub Actions. The deployment process is triggered on pushes to the main branch.

### Render Deployment
To deploy this application to Render:

1. Create a Render account at https://render.com if you haven't already
2. Connect your GitHub repository to Render
3. Create a new Web Service and select your repository
4. Configure the following settings:
   - Name: e-por (or your preferred name)
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
5. Add the following environment variables in Render's dashboard:
   - `FLASK_APP`: app.py
   - `FLASK_ENV`: production
   - `SECRET_KEY`: (Render will generate this automatically)
   - `MAIL_SERVER`: your-smtp-server
   - `MAIL_PORT`: your-smtp-port
   - `MAIL_USE_TLS`: True
   - `MAIL_USERNAME`: your-email
   - `MAIL_PASSWORD`: your-app-password
   - `MAIL_DEFAULT_SENDER`: your-email
6. Click "Create Web Service"

The application will be automatically deployed and you'll get a URL where your app is hosted.

## License

[Add your license information here]

# Flask Configuration
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here  # Generate a strong random key

# Database Configuration (if you're using a database)
DATABASE_URL=your-database-url-here

# Flask-Mail Configuration
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-specific-password
MAIL_DEFAULT_SENDER=your-email@gmail.com

# Other Configuration
DEBUG=True 