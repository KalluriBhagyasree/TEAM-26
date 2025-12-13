from flask import Flask, jsonify, request
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

# ------------------ LOAD DATA ------------------
@app.route('/messages', methods=['GET'])
def messages():
    df = pd.read_csv('spam.csv', encoding='latin-1')
    df = df[['v1', 'v2']]
    df.columns = ['label', 'message']
    df['isSpam'] = df['label'] == 'spam'

    return jsonify(df[['message', 'isSpam']].to_dict(orient='records'))

# ------------------ PREDICT ------------------
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    data = request.get_json()

    if 'message' not in data:
        return jsonify({'error': 'Message is required'}), 400

    vector = vectorizer.transform([data['message']])
    prediction = model.predict(vector)[0]

    return jsonify({
        'result': 'SPAM' if prediction == 1 else 'HAM'
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
