// SenderPage.jsx
import { useState } from "react";

export default function SenderPage() {
  const [form, setForm] = useState({
    senderName: "",
    organization: "",
    registrationNo: "",
    email: "",
    phone: "",
    website: "",
    recipient: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.senderName || !form.recipient || !form.message) {
      alert("Sender name, recipient, and message are required");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(`Message sent! Spam check: ${data.isSpam ? "SPAM" : "HAM"}`);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="senderForm">
      <h2>Official Sender Form</h2>

      <input
        name="senderName"
        placeholder="Sender Name (e.g. GovtBank)"
        value={form.senderName}
        onChange={handleChange}
      />
      <input
        name="organization"
        placeholder="Organization"
        value={form.organization}
        onChange={handleChange}
      />
      <input
        name="registrationNo"
        placeholder="Registration Number"
        value={form.registrationNo}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        name="website"
        placeholder="Website"
        value={form.website}
        onChange={handleChange}
      />
      <input
        name="recipient"
        placeholder="Recipient Phone Number"
        value={form.recipient}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message Body"
        value={form.message}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Send Message</button>
    </div>
  );
}
