# 📩 T8) SMS Spam Filter (Telco Messaging)

## 🧩 Problem Statement
Telecom messaging gateways handle millions of SMS messages daily, including a large number of spam messages.  
The goal of this project is to **classify SMS messages as Spam or Ham (Not Spam)** to improve message quality, security, and user experience.

---

## 📊 Dataset
- **Name:** SMS Spam Collection Dataset  
- **Source:** Kaggle  
- **Link:** https://www.kaggle.com/uciml/sms-spam-collection-dataset  

The dataset contains labeled SMS messages categorized as **spam** or **ham**.

---

## 🎯 Objective
- Build a machine learning model to detect SMS spam.
- Apply **text preprocessing and tokenization**.
- Train a **baseline classifier**.
- Enhance predictions using **rule-based filtering**.
- Export predictions for integration with a telco messaging gateway.

---

## 🚀 Features
- SMS text preprocessing and cleaning
- Tokenization using NLP techniques
- Spam classification using:
  - Naive Bayes (NB)
  - Support Vector Machine (SVM)
- Rule-based detection:
  - URL detection
  - Profanity keyword filtering
- Export prediction results to CSV
- Scalable design for telco gateways

---

## 🛠️ Technology Stack
- **Programming Language:** Python  
- **Machine Learning:** scikit-learn  
- **Text Processing:** Regex, NLP  
- **Optional:** Hugging Face pretrained text classifier  

---

## ⚙️ System Workflow
1. Load and preprocess SMS data  
2. Clean text (lowercasing, stopwords, punctuation removal)  
3. Tokenize messages  
4. Train ML models (NB / SVM)  
5. Apply rule-based spam detection (URLs, profanity)  
6. Generate final predictions  
7. Export results  

---

## 📂 Project Structure
```bash
sms-spam-filter/
│── data/                # Dataset
│── preprocessing/       # Text cleaning & tokenization
│── models/              # NB & SVM models
│── rules/               # Regex-based spam rules
│── predictions/         # Output files
│── main.py              # Entry point
│── requirements.txt
│── README.md
