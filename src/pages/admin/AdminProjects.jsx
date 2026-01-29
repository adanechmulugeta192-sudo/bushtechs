import React, { useState, useEffect } from "react";
import { Trash2, Upload, Save, Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    status: "Completed",
    year: "2025",
    link: ""
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const API_URL = "http://localhost:5000/api";

  // ------------------------------------------
  // 🌙 MODERN DARK THEME STYLES
  // ------------------------------------------
  
  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212", // Matte Black Background
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
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "40px",
    border: "1px solid #333",
    borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  };

  const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    background: "#1e1e1e",
    borderRadius: "10px",
    border: "1px solid #333",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#2d2d2d", // Slightly lighter than card
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  };

  const uploadBox = {
    border: "2px dashed #555",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px",
    background: "#252525",
    color: "#aaa",
    cursor: "pointer",
    transition: "0.2s",
  };

  const btnStyle = {
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.2s",
  };

  const actionBtn = {
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
  };

  // ------------------------------------------
  // LOGIC
  // ------------------------------------------

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (project) => {
    setEditId(project.id);
    setForm({ ...project });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({
      title: "",
      category: "",
      description: "",
      location: "",
      status: "Completed",
      year: "2025",
      link: ""
    });
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (image) formData.append("image", image);

    try {
      const url = editId
        ? `${API_URL}/admin/projects/${editId}`
        : `${API_URL}/admin/projects`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "x-auth-token": token },
        body: formData,
      });

      if (res.ok) {
        alert(editId ? "Updated!" : "Created!");
        fetchProjects();
        handleCancelEdit();
      } else {
        alert("Failed.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete project?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/admin/projects/${id}`, {
      method: "DELETE",
      headers: { "x-auth-token": token },
    });
    fetchProjects();
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------

  return (
    <div style={pageStyle}>
      <AdminSidebar />

      <div style={contentStyle}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", color: "#fff" }}>
          Project Manager
        </h1>

        {/* FORM */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>{editId ? "Edit Project" : "Add Project"}</h3>
            {editId && (
              <button onClick={handleCancelEdit} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center", gap: "5px" }}>
                <X size={16} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={inputStyle}
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                style={inputStyle}
              >
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Planned">Planned</option>
              </select>
            </div>

            <textarea
              placeholder="Description"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                style={inputStyle}
              />
            </div>

            <input
              placeholder="Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              style={inputStyle}
            />

            <div style={uploadBox}>
              <label style={{ cursor: "pointer", width: "100%", display: "block" }}>
                <Upload size={24} style={{ marginBottom: "8px", opacity: 0.7 }} />
                <br />
                {image ? <span style={{color: "#fff"}}>{image.name}</span> : "Upload Image"}
                <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...btnStyle,
                background: editId ? "#facc15" : "#6a00ff",
                color: editId ? "#000" : "#fff",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : editId ? "Update" : "Save Project"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div style={{ display: "grid", gap: "15px" }}>
          {projects.map((p) => (
            <div key={p.id} style={listItemStyle}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {p.image ? (
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt=""
                    style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: 50, height: 50, background: "#333", borderRadius: 8 }}></div>
                )}

                <div>
                  <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>{p.title}</strong>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {p.category} • {p.year}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEditClick(p)} style={{ ...actionBtn, background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    ...actionBtn,
                    color: "#f87171",
                    background: "rgba(239, 68, 68, 0.15)",
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}