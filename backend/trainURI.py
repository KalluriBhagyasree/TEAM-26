from sklearn.ensemble import RandomForestClassifier
import joblib
import re
import numpy as np

# -----------------------
# Feature Extraction
# -----------------------
def extract_features(url):
    return [
        len(url),
        url.count('.'),
        1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0,
        1 if url.startswith("https") else 0,
        url.count('-')
    ]

# -----------------------
# Sample Training Data
# -----------------------
urls = [
    "https://www.india.gov.in",
    "https://www.ap.gov.in",
    "https://secure-pay-ebill.com",
    "http://192.168.1.1/login",
    "https://govt-update-pay-now.in",
    "https://nic.in"
]

labels = [
    0,  # legit
    0,  # legit
    1,  # spam
    1,  # spam
    1,  # spam
    0   # legit
]

X = [extract_features(u) for u in urls]

# -----------------------
# Train Model
# -----------------------
model = RandomForestClassifier()
model.fit(X, labels)

joblib.dump(model, "url_model.pkl")
print("✅ URL ML model trained & saved")
