from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib

app = Flask(__name__)
CORS(app)

EMAIL_CONFIG = {
     "sender": "nicholas.aminzadeh@gmail.com",
     "receiver": "cobaltheir@gmail.com",
     "smtp_server": "smtp.gmail.com", 
     "smtp_port": 587,
     "username": "nicholas.aminzadeh@gmail.com",
     "password": ""
 }

@app.route("/send", methods=["POST"])
def send_email():
    try:
        prediction = request.form.get("prediction")
        file = request.files.get("file")
        
        if not file:
            return jsonify({"error": "No file provided"}), 400
        
        subject = "Handwriting Issue Detected"
        if prediction == "1" or prediction == "BAD" or prediction == "bad":
            body = "The student has uploaded a screenshot that was deemed illegible, which could prove challenging for comprehension. The problematic screenshot is attached below."
        else:
            body = "The student has uploaded a legible screenshot. The screenshot is attached below."
        
        msg = MIMEMultipart()
        msg["Subject"] = subject
        msg["From"] = EMAIL_CONFIG["sender"]
        msg["To"] = EMAIL_CONFIG["receiver"]
        
        msg.attach(MIMEText(body, "plain"))
        
        # Attach the file
        part = MIMEBase("application", "octet-stream")
        part.set_payload(file.read())
        encoders.encode_base64(part)
        part.add_header("Content-Disposition", f"attachment; filename={file.filename}")
        msg.attach(part)

        with smtplib.SMTP(EMAIL_CONFIG["smtp_server"], EMAIL_CONFIG["smtp_port"]) as server:
            server.starttls()
            server.login(EMAIL_CONFIG["username"], EMAIL_CONFIG["password"])
            server.send_message(msg)

        return jsonify({"message": "Email sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":    
    app.run(debug=True,port=5001)