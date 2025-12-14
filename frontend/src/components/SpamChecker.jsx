import { useState } from "react";

export default function SpamChecker() {
  const [senderId, setSenderId] = useState("VM-GOVTAP");
  const [senderType, setSenderType] = useState("GOVT");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSpam = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: {
            sender_id: senderId,
            sender_type: senderType
          },
          message: message
        })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Backend not running");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>📩 SMS Spam Detection</h2>

      <label>Sender ID</label>
      <input
        value={senderId}
        onChange={e => setSenderId(e.target.value)}
        style={styles.input}
      />

      <label>Sender Type</label>
      <select
        value={senderType}
        onChange={e => setSenderType(e.target.value)}
        style={styles.input}
      >
        <option value="GOVT">GOVT</option>
        <option value="BANK">BANK</option>
        <option value="PERSONAL">PERSONAL</option>
      </select>

      <label>Message</label>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={checkSpam} style={styles.button}>
        {loading ? "Checking..." : "Check Spam"}
      </button>

      {result && (
  <div style={styles.result}>
    <h3 style={{ color: result.spam ? "red" : "green" }}>
      {result.spam ? "🚨 SPAM MESSAGE" : "✅ SAFE MESSAGE"}
    </h3>

    <p><b>Sender ID:</b> {result.sender_id || "N/A"}</p>
    <p><b>Confidence:</b> {result.confidence ?? "N/A"}</p>

    {/* ✅ SAFE reasons rendering */}
    {Array.isArray(result.reasons) && result.reasons.length > 0 ? (
      <>
        <p><b>Reasons:</b></p>
        <ul>
          {result.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </>
    ) : (
      <p><b>Reasons:</b> No suspicious patterns detected</p>
    )}
  </div>
)}

    </div>
  );
}

const styles = {
  container: {
    width: "420px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px"
  },
  textarea: {
    width: "100%",
    height: "90px",
    marginBottom: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  result: {
    marginTop: "15px",
    padding: "10px",
    background: "#f4f6f8",
    borderRadius: "5px"
  }
};
