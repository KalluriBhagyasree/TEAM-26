from flask import Flask, jsonify, request
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load AI model
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

@app.route('/messages', methods=['GET'])
def load_data():
    datafile = pd.read_csv('spam.csv', encoding='latin-1')
    datafile = datafile[['v1', 'v2']]
    datafile.columns = ['label', 'message']

    is_spam_list = []
    for label in datafile['label']:
        if label == 'spam':
            is_spam_list.append(True)
        else:
            is_spam_list.append(False)

    datafile['isSpam'] = is_spam_list
    return jsonify(datafile[['message', 'isSpam']].to_dict(orient='records'))


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        return jsonify({'message': 'Send a POST request with JSON to predict spam'})

    data = request.json
    message = data.get('message')
    vector = vectorizer.transform([message])
    prediction = model.predict(vector)[0]

    result = "SPAM" if prediction == 1 else "HAM"
    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)
