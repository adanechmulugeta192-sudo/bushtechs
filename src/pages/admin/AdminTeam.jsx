import React, { useState, useEffect } from "react";
import { Trash2, Pencil, UserPlus, Save, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", linkedin_url: "", twitter_url: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // ------------------------------------------
  // 🌙 MODERN DARK THEME STYLES
  // ------------------------------------------

  const pageStyle = { display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0c", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" };
  const contentStyle = { flex: 1, marginLeft: "260px", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" };
  const cardStyle = { width: "100%", maxWidth: "700px", background: "#16161a", padding: "30px", borderRadius: "16px", marginBottom: "30px", border: "1px solid #222", borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" };
  const memberCardStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", background: "#16161a", borderRadius: "12px", marginBottom: "15px", border: "1px solid #222", width: "100%", maxWidth: "700px" };
  const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#000", color: "#fff", outline: "none", fontSize: "14px" };
  
  const submitBtn = { 
    padding: "14px", 
    background: editId ? "#facc15" : "linear-gradient(90deg, #6a00ff, #d900ff)", 
    color: editId ? "#000" : "#fff", 
    border: "none", borderRadius: "10px", fontWeight: "800", cursor: "pointer", width: "100%", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchTeam();
  }, [navigate]);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/team`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleEditClick = (member) => {
    setEditId(member._id || member.id);
    setForm({
      name: member.name || "",
      role: member.role || "",
      linkedin_url: member.linkedin_url || "",
      twitter_url: member.twitter_url || "",
    });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ name: "", role: "", linkedin_url: "", twitter_url: "" });
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
        ? `${API_BASE}/api/admin/team/${editId}`
        : `${API_BASE}/api/admin/team`;
      
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Authorization": `Bearer ${token}` }, // ✅ Standard Auth
        body: formData,
      });

      if (res.ok) {
        fetchTeam();
        handleCancelEdit();
      } else {
        alert("Action failed. Please verify your admin session.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this team member?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/admin/team/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) fetchTeam();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={pageStyle}>
      <AdminSidebar />

      <div style={contentStyle}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "30px", color: "#fff", letterSpacing: "-1px" }}>
          Team <span style={{color: "#6a00ff"}}>Directory</span>
        </h1>

        {/* FORM CARD */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
              {editId ? <Pencil size={20} color="#facc15"/> : <UserPlus size={20} color="#6a00ff" />}
              {editId ? "Update Member Profile" : "Register New Member"}
            </h3>
            {editId && (
              <button onClick={handleCancelEdit} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                <X size={16} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />
              <input placeholder="Role (e.g. CEO, Lead Dev)" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input placeholder="LinkedIn Profile URL" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} style={inputStyle} />
              <input placeholder="Twitter Profile URL" value={form.twitter_url} onChange={(e) => setForm({ ...form, twitter_url: e.target.value })} style={inputStyle} />
            </div>

            <div style={{ padding: "10px", border: "1px dashed #333", borderRadius: "8px", textAlign: "center", background: "#000" }}>
                <label style={{ cursor: "pointer", color: "#888", fontSize: "13px" }}>
                    {image ? <span style={{color: "#fff", fontWeight: "bold"}}>{image.name}</span> : "Upload Profile Photo (JPG/PNG)"}
                    <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                </label>
            </div>

            <button type="submit" disabled={loading} style={submitBtn}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={18} />}
              {loading ? "Processing..." : editId ? "Apply Changes" : "Save Member"}
            </button>
          </form>
        </div>

        {/* LIST OF MEMBERS */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {members.map((m) => (
            <div key={m._id || m.id} style={memberCardStyle}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <div style={{ width: 55, height: 55, borderRadius: "50%", overflow: "hidden", border: "2px solid #222", background: "#111" }}>
                    {m.image ? (
                    <img src={`${API_BASE}/${m.image}`} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontSize: "10px" }}>NO IMG</div>
                    )}
                </div>
                <div>
                  <strong style={{ fontSize: "1.1rem", color: "#fff", display: "block" }}>{m.name}</strong>
                  <div style={{ fontSize: "0.85rem", color: "#666", fontWeight: "500" }}>{m.role}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEditClick(m)} style={{ background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "8px", borderRadius: "8px", cursor: "pointer" }}>
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(m._id || m.id)} style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "8px", borderRadius: "8px", cursor: "pointer" }}>
                  <Trash2 size={18} />
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
