from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
