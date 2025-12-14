from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pickle
import joblib
import re
import random

app = Flask(__name__)
CORS(app)

# ------------------ LOAD MODELS ------------------

# Message spam model
message_model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

# URL phishing ML model
url_model = joblib.load("url_model.pkl")

# ------------------ URL FEATURE EXTRACTION ------------------

def extract_url_features(url):
    return [
        len(url),
        url.count('.'),
        1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0,
        1 if url.startswith("https") else 0,
        url.count('-')
    ]

def extract_urls(text):
    return re.findall(r'https?://\S+', text)

# ------------------ OTP LOGIN STORAGE ------------------
otp_store = {}     # phone -> otp
user_store = {}    # phone -> name

# ------------------ SEND OTP ------------------
@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    name = data.get("name")
    phone = data.get("phone")

    if not name or not phone:
        return jsonify({"error": "Name and phone required"}), 400

    otp = random.randint(100000, 999999)
    otp_store[phone] = otp
    user_store[phone] = name

    # Print OTP to console (hackathon demo)
    print(f"OTP for {phone} ({name}): {otp}")

    return jsonify({"message": "OTP sent successfully"})

# ------------------ VERIFY OTP ------------------
@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    phone = data.get("phone")
    otp = data.get("otp")

    if phone in otp_store and otp_store[phone] == int(otp):
        user = {"phone": phone, "name": user_store.get(phone)}
        del otp_store[phone]  # remove used OTP
        return jsonify({"success": True, "user": user})
    else:
        return jsonify({"success": False, "error": "Invalid OTP"}), 400

# ------------------ LOAD DATA (OPTIONAL) ------------------
@app.route('/messages', methods=['GET'])
def messages():
    df = pd.read_csv('spam.csv', encoding='latin-1')
    df = df[['v1', 'v2']]
    df.columns = ['label', 'message']
    df['isSpam'] = df['label'] == 'spam'

    return jsonify(df[['message', 'isSpam']].to_dict(orient='records'))

# ------------------ SPAM CHECK ------------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    sender = data.get("sender", {})
    message = data.get("message", "")

    spam = False
    reasons = []
    ml_probabilities = []

    # 🔹 MESSAGE ML
    message_vector = vectorizer.transform([message])
    message_proba = message_model.predict_proba(message_vector)[0]
    message_spam_prob = float(message_proba[1])
    ml_probabilities.append(message_spam_prob)

    if message_spam_prob >= 0.6:
        spam = True
        reasons.append("ML detected spam message text")

    # 🔹 URL ML
    urls = extract_urls(message)
    for url in urls:
        features = [extract_url_features(url)]
        url_proba = url_model.predict_proba(features)[0]
        url_spam_prob = float(url_proba[1])
        ml_probabilities.append(url_spam_prob)

        if url_spam_prob >= 0.6:
            spam = True
            reasons.append("ML detected phishing URL")

    # 🔹 Sender behavior (rule)
    if sender.get("sender_type") == "GOVT" and urls:
        reasons.append("Government sender contains external URL")

    confidence = round(max(ml_probabilities), 2) if ml_probabilities else 0.0

    return jsonify({
        "sender_id": sender.get("sender_id"),
        "spam": spam,
        "confidence": confidence,
        "reasons": reasons
    })

# ------------------ RUN SERVER ------------------
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
