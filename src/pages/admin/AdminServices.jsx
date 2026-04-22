import React, { useState, useEffect } from "react";
import { Trash2, Upload, Plus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const navigate = useNavigate();

  // --- STYLES ---
  const pageStyle = { display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0c", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" };
  const contentStyle = { flex: 1, marginLeft: "260px", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" };
  const cardStyle = { width: "100%", maxWidth: "600px", background: "#16161a", padding: "30px", borderRadius: "16px", marginBottom: "30px", border: "1px solid #222", borderTop: "4px solid #6a00ff", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" };
  const listItemStyle = { width: "100%", maxWidth: "600px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px", background: "#16161a", borderRadius: "12px", border: "1px solid #222", color: "#fff", marginBottom: "12px" };
  const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#000", color: "#fff", outline: "none", fontSize: "14px" };
  const uploadBox = { width: "100%", padding: "15px", background: "#000", borderRadius: "8px", border: "2px dashed #333", color: "#888", cursor: "pointer", textAlign: "center" };
  const saveBtn = { padding: "14px", background: "linear-gradient(90deg, #6a00ff, #d900ff)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", width: "100%", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchServices();
  }, [navigate]);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_BASE}/api/admin/services`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }, // ✅ Bearer Auth
        body: formData,
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "Service deployed successfully!" });
        setForm({ title: "", description: "" });
        setImage(null);
        fetchServices();
      } else {
        setStatus({ type: "error", msg: "Failed to save service." });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Server connection error." });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: "", msg: "" }), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service permanently?")) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/admin/services/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (res.ok) fetchServices();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div style={pageStyle}>
      <AdminSidebar />
      <div style={contentStyle}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "40px", color: "#fff", letterSpacing: "-1px" }}>
          Service <span style={{color: "#6a00ff"}}>Engine</span>
        </h1>

        <div style={cardStyle}>
          <h3 style={{ color: "#fff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
            <Plus size={20} color="#6a00ff" /> Register New Service
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <input placeholder="Service Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={inputStyle} />
            <textarea placeholder="Detailed Description" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required style={{...inputStyle, resize: "vertical"}} />
            
            <div style={uploadBox}>
              <label style={{ cursor: "pointer", display: "block" }}>
                <Upload size={24} style={{ marginBottom: "8px", color: image ? "#6a00ff" : "#444" }} />
                <div style={{fontSize: "13px"}}>{image ? <span style={{color: "#fff"}}>{image.name}</span> : "Select Icon/Image (JPG/PNG)"}</div>
                <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>

            <button type="submit" disabled={loading} style={saveBtn}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={18} />}
              {loading ? "Processing..." : "Deploy Service"}
            </button>
          </form>

          {status.msg && (
            <div style={{ marginTop: "15px", color: status.type === "success" ? "#4ade80" : "#f87171", fontSize: "14px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {status.msg}
            </div>
          )}
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {services.map((s) => (
            <div key={s._id || s.id} style={listItemStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={{ width: "50px", height: "50px", background: "#000", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #333" }}>
                  {s.image ? (
                    <img src={`${API_BASE}/${s.image}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <Plus size={20} color="#222" />
                  )}
                </div>
                <div>
                  <strong style={{ color: "#fff", display: "block", fontSize: "16px" }}>{s.title}</strong>
                  <div style={{ fontSize: "12px", color: "#666", marginTop: "2px", maxWidth: "350px" }}>
                    {s.description.length > 60 ? s.description.substring(0, 60) + "..." : s.description}
                  </div>
                </div>
              </div>

              <button onClick={() => handleDelete(s._id || s.id)} style={deleteBtn}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
