import React, { useState, useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", linkedin_url: "", twitter_url: "" });
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
    alignItems: "center",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "700px",
    background: "#1e1e1e", // Dark Surface
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "30px",
    border: "1px solid #333",
    borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff", // Accent top border
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  };

  const memberCardStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#1e1e1e",
    borderRadius: "10px",
    marginBottom: "15px",
    border: "1px solid #333",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#2d2d2d", // Lighter grey for inputs
    color: "#fff",
    outline: "none",
  };

  const submitBtn = {
    padding: "14px",
    background: editId ? "#facc15" : "#6a00ff",
    color: editId ? "#000" : "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    fontSize: "1rem",
    transition: "0.2s",
  };

  const editBtn = {
    color: "#60a5fa",
    background: "rgba(59, 130, 246, 0.15)",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  const deleteBtn = {
    color: "#f87171",
    background: "rgba(239, 68, 68, 0.15)",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  // ------------------------------------------
  // LOGIC
  // ------------------------------------------

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchTeam();
  }, [navigate]);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_URL}/team`);
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (member) => {
    setEditId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      linkedin_url: member.linkedin_url || "",
      twitter_url: member.twitter_url || "",
    });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        ? `${API_URL}/admin/team/${editId}`
        : `${API_URL}/admin/team`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "x-auth-token": token },
        body: formData,
      });

      if (res.ok) {
        alert(editId ? "Updated!" : "Created!");
        fetchTeam();
        setEditId(null);
        setForm({ name: "", role: "", linkedin_url: "", twitter_url: "" });
        setImage(null);
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
    if (!window.confirm("Delete member?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/admin/team/${id}`, {
      method: "DELETE",
      headers: { "x-auth-token": token },
    });
    fetchTeam();
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------

  return (
    <div style={pageStyle}>
      <AdminSidebar />

      <div style={contentStyle}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", color: "#fff" }}>
          Team Manager
        </h1>

        {/* FORM CARD */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "20px", color: "#fff" }}>
            {editId ? "Edit Member" : "Add New Member"}
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                placeholder="Role / Position"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                placeholder="LinkedIn URL"
                value={form.linkedin_url}
                onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                style={inputStyle}
              />
              <input
                placeholder="Twitter URL"
                value={form.twitter_url}
                onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
                style={inputStyle}
              />
            </div>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ color: "#aaa", padding: "10px 0" }}
            />

            <button type="submit" disabled={loading} style={submitBtn}>
              {loading ? "Processing..." : editId ? "Update Member" : "Save Member"}
            </button>
          </form>
        </div>

        {/* LIST OF MEMBERS */}
        <div style={{ width: "100%", maxWidth: "700px", display: "grid", gap: "0px" }}>
          {members.map((m) => (
            <div key={m.id} style={memberCardStyle}>
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                {m.image ? (
                  <img
                    src={`http://localhost:5000${m.image}`}
                    alt="thumb"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #333"
                    }}
                  />
                ) : (
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#333" }}></div>
                )}
                <div>
                  <strong style={{ fontSize: "1.1rem", color: "#fff", display: "block" }}>
                    {m.name}
                  </strong>
                  <div style={{ fontSize: "0.9rem", color: "#888" }}>
                    {m.role}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEditClick(m)} style={editBtn}>
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(m.id)} style={deleteBtn}>
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