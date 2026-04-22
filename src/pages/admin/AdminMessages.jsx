import React, { useEffect, useState } from "react";
import { Trash2, Mail, Phone, Loader2, MessageSquare } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/admin/contact-submissions`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this inquiry?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/admin/contact-submissions/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      if (res.ok) setMessages(messages.filter(m => (m._id || m.id) !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0c", color: "#fff" }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: "260px", padding: "40px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "30px", fontWeight: "800" }}>Messages ({messages.length})</h1>
        
        {loading ? <Loader2 className="animate-spin" /> : (
          <div style={{ display: "grid", gap: "20px" }}>
            {messages.map(msg => (
              <div key={msg._id} style={{ background: "#16161a", padding: "25px", borderRadius: "15px", border: "1px solid #222" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ color: "#d900ff", margin: 0 }}>{msg.name}</h3>
                  <span style={{ color: "#555", fontSize: "0.8rem" }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{msg.email} | {msg.phone}</p>
                <div style={{ background: "#000", padding: "15px", borderRadius: "10px", margin: "15px 0", border: "1px solid #333" }}>
                  {msg.message}
                </div>
                <button onClick={() => handleDelete(msg._id)} style={{ background: "none", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "8px 15px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`.animate-spin { animation: rotate 1s linear infinite; } @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
