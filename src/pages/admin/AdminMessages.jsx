import React, { useEffect, useState } from "react";
import { Trash2, Mail } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const API_BASE = "http://localhost:5000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/api/admin/contact-submissions`, {
      headers: { "x-auth-token": token }
    })
    .then(res => res.json())
    .then(data => setMessages(Array.isArray(data) ? data : []))
    .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Delete message?")) return;
    const token = localStorage.getItem("token");
    
    await fetch(`${API_BASE}/api/admin/contact-submissions/${id}`, { 
      method: "DELETE", 
      headers: { "x-auth-token": token } 
    });
    
    setMessages(messages.filter(m => m.id !== id));
  };

  // ------------------------------------------
  // 🌙 MODERN DARK THEME STYLES
  // ------------------------------------------

  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212", // Matte Black
    color: "#e0e0e0",
    fontFamily: "'Inter', sans-serif",
  };

  const contentStyle = {
    flex: 1,
    marginLeft: "260px",
    padding: "40px",
  };

  const cardStyle = {
    background: "#1e1e1e", // Dark Surface
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #333",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    marginBottom: "15px",
    transition: "0.2s",
  };

  const messageBoxStyle = {
    background: "#2d2d2d", // Slightly lighter for content
    padding: "15px",
    borderRadius: "8px",
    color: "#ddd",
    lineHeight: "1.6",
    marginBottom: "15px",
    border: "1px solid #444",
  };

  const deleteBtnStyle = {
    color: "#f87171",
    background: "rgba(239, 68, 68, 0.15)", // Muted Red
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.9rem",
    transition: "0.2s",
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------

  return (
    <div style={pageStyle}>
      <AdminSidebar />
      <div style={contentStyle}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", color: "#fff" }}>
          Messages ({messages.length})
        </h1>
        <div style={{ display: "grid", gap: "15px" }}>
          {messages.map(msg => (
            <div key={msg.id} style={cardStyle}>
              
              {/* HEADER: Name & Date */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <strong style={{ fontSize: "1.1rem", color: "#fff" }}>{msg.name}</strong>
                <span style={{ fontSize: "0.85rem", color: "#888" }}>
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
              </div>

              {/* SERVICE TYPE */}
              <div style={{ fontSize: "0.9rem", color: "#a78bfa", fontWeight: "600", marginBottom: "10px" }}>
                 {msg.service_type || "General Inquiry"}
              </div>

              {/* CONTACT INFO */}
              <div style={{ fontSize: "0.9rem", color: "#aaa", marginBottom: "15px", display: "flex", alignItems: "center", gap: "5px" }}>
                <Mail size={14} /> {msg.email} <span style={{color: "#555"}}>|</span> 📞 {msg.phone}
              </div>

              {/* MESSAGE CONTENT */}
              <p style={messageBoxStyle}>
                {msg.message}
              </p>

              {/* DELETE BUTTON */}
              <button onClick={() => handleDelete(msg.id)} style={deleteBtnStyle}>
                <Trash2 size={16}/> Delete
              </button>
            </div>
          ))}

          {messages.length === 0 && <p style={{color:"#888", textAlign: "center", marginTop: "20px"}}>No messages found.</p>}
        </div>
      </div>
    </div>
  );
}