import React, { useEffect, useState } from "react"; 
import { Save, Loader2, Target, Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar"; 

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function AdminMissionVision() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  
  const [formData, setFormData] = useState({
    mission_title: "",
    mission_desc: "",
    vision_title: "",
    vision_desc: ""
  });

  // Fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/admin/login"); return; }

    fetch(`${API_BASE}/api/mission-vision`)
      .then((res) => res.json())
      .then((data) => {
        // Handle case where data might be an array or single object
        const content = Array.isArray(data) ? data[0] : data;
        if (content) {
          setFormData({
            mission_title: content.mission_title || "",
            mission_desc: content.mission_desc || "",
            vision_title: content.vision_title || "",
            vision_desc: content.vision_desc || ""
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: "", msg: "" });

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/admin/mission-vision`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // ✅ CHANGED TO BEARER TOKEN FOR CONSISTENCY
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: "success", msg: "✔ Mission & Vision updated successfully!" });
        setTimeout(() => setStatus({ type: "", msg: "" }), 4000);
      } else if (res.status === 401 || res.status === 403) {
        setStatus({ type: "error", msg: "❌ Session expired. Please login again." });
        setTimeout(() => navigate("/admin/login"), 2000);
      } else {
        setStatus({ type: "error", msg: "❌ Failed to save changes." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", msg: "❌ Server connection error." });
    } finally {
      setSaving(false);
    }
  };

  const styles = {
    container: { display: "flex", minHeight: "100vh", background: "#0a0a0c", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" },
    content: { flex: 1, marginLeft: "260px", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center" },
    header: { fontSize: "2.2rem", fontWeight: "800", marginBottom: "30px", color: "#fff", letterSpacing: "-1px" },
    card: { width: "100%", maxWidth: "750px", background: "#16161a", padding: "30px", borderRadius: "16px", marginBottom: "25px", border: "1px solid #222", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" },
    sectionTitle: { fontSize: "1.2rem", fontWeight: "600", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", color: "#fff" },
    label: { display: "block", marginBottom: "8px", fontWeight: "500", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" },
    input: { width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #222", background: "#000", color: "#fff", marginBottom: "20px", fontSize: "1rem", outline: "none", transition: "border 0.3s" },
    textarea: { width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid #222", background: "#000", color: "#fff", minHeight: "140px", fontSize: "1rem", marginBottom: "10px", outline: "none", fontFamily: "inherit", resize: "vertical" },
    btn: { background: "linear-gradient(135deg, #6a00ff, #d900ff)", color: "#fff", padding: "16px", border: "none", borderRadius: "12px", cursor: saving ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "bold", width: "100%", maxWidth: "750px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", transition: "0.3s", opacity: saving ? 0.7 : 1 },
    msg: { marginTop: "20px", padding: "15px", borderRadius: "12px", fontWeight: "500", width: "100%", maxWidth: "750px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem" }
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />
      <div style={styles.content}>
        <h1 style={styles.header}>Company Essence</h1>

        {loading ? (
          <div style={{marginTop: "50px"}}><Loader2 className="animate-spin" size={40} color="#6a00ff" /></div>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "750px" }}>
            
            {/* Mission Section */}
            <div style={{...styles.card, borderLeft: "5px solid #6a00ff"}}>
              <h3 style={styles.sectionTitle}><Target size={22} color="#6a00ff"/> Mission Statement</h3>
              <label style={styles.label}>Heading</label>
              <input type="text" name="mission_title" value={formData.mission_title} onChange={handleChange} style={styles.input} placeholder="Enter mission title..." />
              <label style={styles.label}>Description</label>
              <textarea name="mission_desc" value={formData.mission_desc} onChange={handleChange} style={styles.textarea} placeholder="Describe the company's daily mission..." />
            </div>

            {/* Vision Section */}
            <div style={{...styles.card, borderLeft: "5px solid #d900ff"}}>
              <h3 style={styles.sectionTitle}><Eye size={22} color="#d900ff"/> Future Vision</h3>
              <label style={styles.label}>Heading</label>
              <input type="text" name="vision_title" value={formData.vision_title} onChange={handleChange} style={styles.input} placeholder="Enter vision title..." />
              <label style={styles.label}>Description</label>
              <textarea name="vision_desc" value={formData.vision_desc} onChange={handleChange} style={styles.textarea} placeholder="Describe the long-term vision..." />
            </div>

            <button type="submit" style={styles.btn} disabled={saving}>
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {saving ? "Updating System..." : "Apply Changes"}
            </button>

            {status.msg && (
              <div style={{
                ...styles.msg,
                background: status.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                color: status.type === "success" ? "#4ade80" : "#f87171",
                border: `1px solid ${status.type === "success" ? "#22c55e33" : "#ef444433"}`
              }}>
                {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                {status.msg}
              </div>
            )}
          </form>
        )}
      </div>
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
