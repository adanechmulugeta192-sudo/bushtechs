import React, { useState, useEffect } from "react";
import { Trash2, Upload, Save, Pencil, X, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

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

  // --- STYLES ---
  const pageStyle = { display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0c", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" };
  const contentStyle = { flex: 1, marginLeft: "260px", padding: "40px" };
  const cardStyle = { background: "#16161a", padding: "30px", borderRadius: "16px", marginBottom: "40px", border: "1px solid #222", borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" };
  const listItemStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", background: "#16161a", borderRadius: "12px", border: "1px solid #222", marginBottom: "12px" };
  const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#000", color: "#fff", outline: "none", fontSize: "14px" };
  const uploadBox = { border: "2px dashed #333", padding: "20px", textAlign: "center", borderRadius: "10px", background: "#000", color: "#888", cursor: "pointer" };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      // Public route for fetching
      const res = await fetch(`${API_BASE}/api/projects`);
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleEditClick = (project) => {
    setEditId(project._id || project.id);
    setForm({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      location: project.location || "",
      status: project.status || "Completed",
      year: project.year || "2025",
      link: project.link || ""
    });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ title: "", category: "", description: "", location: "", status: "Completed", year: "2025", link: "" });
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
        ? `${API_BASE}/api/admin/projects/${editId}`
        : `${API_BASE}/api/admin/projects`;

      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Authorization": `Bearer ${token}` }, // ✅ Standard Auth
        body: formData,
      });

      if (res.ok) {
        fetchProjects();
        handleCancelEdit();
      } else {
        alert("Failed to save project. Ensure you are logged in.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project permanentely?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={pageStyle}>
      <AdminSidebar />
      <div style={contentStyle}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "30px", color: "#fff", letterSpacing: "-1px" }}>
          Project <span style={{color: "#6a00ff"}}>Portfolio</span>
        </h1>

        {/* FORM SECTION */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>{editId ? "Update Project" : "Create New Project"}</h3>
            {editId && (
              <button onClick={handleCancelEdit} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                <X size={16} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <input placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={inputStyle} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input placeholder="Category (e.g. Web Dev)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle} />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Planned">Planned</option>
              </select>
            </div>

            <textarea placeholder="Description" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required style={{...inputStyle, resize: "vertical"}} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} style={inputStyle} />
              <input placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} style={inputStyle} />
            </div>

            <input placeholder="External Link (Optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} style={inputStyle} />

            <div style={uploadBox}>
              <label style={{ cursor: "pointer", width: "100%", display: "block" }}>
                <Upload size={24} style={{ marginBottom: "8px", color: image ? "#d900ff" : "#444" }} />
                <div style={{fontSize: "13px"}}>{image ? <span style={{color: "#fff", fontWeight: "bold"}}>{image.name}</span> : "Drop project thumbnail here"}</div>
                <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>

            <button type="submit" disabled={loading} style={{ padding: "16px", border: "none", borderRadius: "10px", fontWeight: "800", cursor: loading ? "not-allowed" : "pointer", background: editId ? "#facc15" : "linear-gradient(90deg, #6a00ff, #d900ff)", color: editId ? "#000" : "#fff", opacity: loading ? 0.7 : 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : editId ? <CheckCircle2 size={20}/> : <Save size={20} />}
              {loading ? "Processing..." : editId ? "Apply Changes" : "Deploy Project"}
            </button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div style={{ display: "grid", gap: "12px" }}>
          {projects.map((p) => (
            <div key={p._id || p.id} style={listItemStyle}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <div style={{ width: "60px", height: "45px", background: "#000", borderRadius: "6px", overflow: "hidden", border: "1px solid #333" }}>
                  {p.image ? (
                    <img src={`${API_BASE}/${p.image}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#444" }}>N/A</div>
                  )}
                </div>

                <div>
                  <strong style={{ color: "#fff", display: "block", fontSize: "15px" }}>{p.title}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {p.category} <span style={{margin: "0 5px"}}>•</span> {p.year} <span style={{margin: "0 5px"}}>•</span> <span style={{color: p.status === "Completed" ? "#4ade80" : "#facc15"}}>{p.status}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEditClick(p)} style={{ background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "8px", borderRadius: "8px", cursor: "pointer" }}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(p._id || p.id)} style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "8px", borderRadius: "8px", cursor: "pointer" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
