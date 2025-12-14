# 📩 AI SMS Spam Detection System

An AI-powered web application that detects **Spam vs Ham SMS messages** using Machine Learning and rule-based analysis.  
Built as a **hackathon-ready demo** with OTP-based login and message analysis.

---

## 🚀 Features

- 🔐 OTP-based Login (Demo OTP shown in backend console)
- 🤖 AI-based SMS Spam Detection
- 🔗 Phishing URL Detection inside messages
- 👤 Sender-based spam checking
- 📊 Spam vs Ham message classification
- 🧾 Clear explanation with confidence score
- 🖥️ User-friendly React dashboard

---

## 🧠 How It Works

1. User logs in using **Name + Phone Number**
2. OTP is generated and printed in **Flask backend console**
3. User verifies OTP and enters the dashboard
4. User submits an SMS message
5. AI model analyzes:
   - Message text (ML model)
   - URLs inside message (URL phishing model)
   - Sender behavior rules
6. Result is shown as **Spam / Ham** with confidence and reasons

---

## 📊 Spam vs Ham Detection

- **Spam**  
  Messages detected as promotional, phishing, malicious, or suspicious  
- **Ham**  
  Genuine, normal, or personal messages  

The system combines:
- Machine Learning probabilities
- Rule-based checks
- URL feature analysis  

---

## ✅ Future Improvements

- 📲 **Real SMS Gateway Integration**  
  Integrate services like Twilio or Fast2SMS to send real OTPs and alerts.

- 🗄️ **Database Integration**  
  Store users, message history, and spam results using MySQL or MongoDB.

- 📊 **User-Specific Spam vs Ham Analytics**  
  Display graphs showing how many spam and ham messages were checked by each user.

- 🛡️ **Admin Dashboard**  
  Provide admin-level access to monitor overall spam trends and user activity.

- 🔐 **JWT Authentication**  
  Implement secure authentication using JSON Web Tokens for session management.

## 📈 Spam vs Ham Graph Module (Planned)

To enhance user insights, a **Spam vs Ham Graph Module** will be developed.

### 🔹 Objective
- Visually display the number of **Spam** and **Ham** messages checked
- Provide **user-specific analytics**
- Improve understanding of message safety patterns

### 🔹 Features
- 📊 Bar chart or Pie chart for Spam vs Ham comparison
- 👤 Analytics based on the logged-in user
- 🔄 Auto-update graph after each message analysis
- 📅 Time-based filters (daily / weekly / overall)

### 🔹 Implementation Strategy
- Store each user's message analysis results in the backend
- Create an analytics API endpoint (e.g., `/user-stats`)
- Use React chart libraries such as **Chart.js** or **Recharts**
- Display the graph when the **profile icon** is clicked
