import React, { useState, useEffect } from "react";
import { Trash2, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // CENTER CONTENT
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "600px",
    background: "#1e1e1e", // Dark Surface
    padding: "30px",
    borderRadius: "15px",
    marginBottom: "30px",
    border: "1px solid #333",
    borderTop: "4px solid #6a00ff", // Purple accent
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  };

  const listItemStyle = {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px",
    background: "#1e1e1e",
    borderRadius: "12px",
    border: "1px solid #333",
    color: "#fff",
    marginBottom: "12px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    width: "100%", // Ensure inputs fill container
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#2d2d2d",
    color: "#fff",
    outline: "none",
  };

  const uploadBox = {
    width: "100%",
    padding: "12px",
    background: "#2d2d2d",
    borderRadius: "8px",
    border: "1px dashed #555",
    color: "#aaa",
    cursor: "pointer",
  };

  const saveBtn = {
    padding: "14px",
    background: "#6a00ff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    fontSize: "1rem",
    transition: "0.2s",
  };

  const deleteBtn = {
    color: "#f87171",
    background: "rgba(239, 68, 68, 0.15)",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // ==========================================
  // LOGIC
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchServices();
  }, [navigate]);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    await fetch(`${API_URL}/admin/services`, {
      method: "POST",
      headers: { "x-auth-token": token },
      body: formData,
    });

    alert("Service Added!");
    setForm({ title: "", description: "" });
    setImage(null);
    fetchServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete service?")) return;

    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/admin/services/${id}`, {
      method: "DELETE",
      headers: { "x-auth-token": token },
    });

    fetchServices();
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div style={pageStyle}>
      <AdminSidebar />

      <div style={contentStyle}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", color: "#fff" }}>
          Service Manager
        </h1>

        {/* ADD SERVICE CARD */}
        <div style={cardStyle}>
          <h3 style={{ color: "#fff", marginBottom: "20px" }}>Add New Service</h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />

            <textarea
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              style={inputStyle}
            />

            <input 
              type="file" 
              onChange={(e) => setImage(e.target.files[0])} 
              style={uploadBox} 
            />

            <button type="submit" style={saveBtn}>Save Service</button>
          </form>
        </div>

        {/* LIST */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {services.map((s) => (
            <div key={s.id} style={listItemStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {/* Optional: Display Image if available, logic preserved from typical patterns */}
                    {s.image && <img src={`http://localhost:5000${s.image}`} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} />}
                    <div>
                        <strong style={{ color: "#fff", display: "block" }}>{s.title}</strong>
                        {/* Short description preview for better UX */}
                        <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>
                            {s.description.length > 50 ? s.description.substring(0, 50) + "..." : s.description}
                        </div>
                    </div>
                </div>

                <button onClick={() => handleDelete(s.id)} style={deleteBtn}>
                <Trash2 size={18} />
                </button>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}