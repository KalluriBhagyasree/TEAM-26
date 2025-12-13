import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load dataset
datafile = pd.read_csv('spam.csv', encoding='latin-1')
datafile = datafile[['v1', 'v2']]
datafile.columns = ['label', 'message']

# Convert labels to numbers
y = []
for label in datafile['label']:
    if label == 'spam':
        y.append(1)
    else:
        y.append(0)

# Text vectorization
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(datafile['message'])

# Train model
model = MultinomialNB()
model.fit(X, y)

# Save model & vectorizer
pickle.dump(model, open('model.pkl', 'wb'))
pickle.dump(vectorizer, open('vectorizer.pkl', 'wb'))

print("AI model trained and saved successfully!")
