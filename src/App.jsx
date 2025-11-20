import React, { useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setMsg("Sending...");

    try {
      const res = await fetch("http://localhost:5012/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg("Message Sent Successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setMsg(data.error || "Failed to send.");
      }
    } catch (error) {
      setMsg("Backend not reachable!");
    }
  };

  return (
    <div className="container">
      <h1>My Portfolio</h1>
      <p>Welcome to my simple portfolio powered by React + Node.</p>

      <h2>Contact Me</h2>
      <form onSubmit={sendMessage} className="form-box">
        <input
          name="name"
          value={form.name}
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          value={form.message}
          placeholder="Message"
          rows="4"
          onChange={handleChange}
          required
        />

        <button type="submit">Send</button>
      </form>

      <p className="status">{msg}</p>
    </div>
  );
}

export default App;
