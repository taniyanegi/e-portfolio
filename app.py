from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from flask_mail import Mail, Message
from email_validator import validate_email, EmailNotValidError
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = 'taniyanegi1600@gmail.com'

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/education')
def education():
    return render_template('education.html')

@app.route('/certifications')
def certifications():
    return render_template('certifications.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/interview-videos')
def interview_videos():
    return render_template('interview_videos.html')

@app.route('/pese-lab')
def pese_lab():
    return render_template('pese_lab.html')

@app.route('/resume')
def resume():
    return render_template('resume.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Validate input
        if not all([name, email, message]):
            flash('All fields are required!', 'error')
            return redirect(url_for('contact'))
        
        try:
            # Validate email
            validate_email(email)
            
            # Send email
            msg = Message(
                subject=f'Portfolio Contact from {name}',
                recipients=['taniyanegi1600@gmail.com'],
                body=f'''
                Name: {name}
                Email: {email}
                Message: {message}
                '''
            )
            mail.send(msg)
            flash('Message sent successfully!', 'success')
            return redirect(url_for('contact'))
            
        except EmailNotValidError:
            flash('Please enter a valid email address!', 'error')
            return redirect(url_for('contact'))
        except Exception as e:
            flash('An error occurred. Please try again later.', 'error')
            return redirect(url_for('contact'))
            
    return render_template('contact.html')

if __name__ == '__main__':
    app.run(debug=True) 