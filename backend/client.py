import requests
import json

# API URL
url = "http://127.0.0.1:5000/predict"

# Request payload
payload = {
    "sender": {
        "sender_id": "VM-GOVTAP",
        "sender_type": "GOVT"
    },
    "message": "Urgent! Pay your electricity bill now https://fake-ebill-pay.com"
}

# Send POST request
response = requests.post(
    url,
    headers={"Content-Type": "application/json"},
    data=json.dumps(payload)
)

# Print response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
