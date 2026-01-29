import React, { useEffect, useState } from "react"; 
import { Save, Loader2, Target, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar"; 

const API_BASE = "http://localhost:5000";

export default function AdminMissionVision() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  
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
        setFormData({
          mission_title: data.mission_title || "",
          mission_desc: data.mission_desc || "",
          vision_title: data.vision_title || "",
          vision_desc: data.vision_desc || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [navigate]);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/mission-vision`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("✔ Updated Successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else if (res.status === 401) {
        setMessage("❌ Session expired. Redirecting...");
        setTimeout(() => {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }, 2000);
      } else {
        setMessage("❌ Failed to update.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server Error.");
    } finally {
      setSaving(false);
    }
  };

  // ------------------------------------------
  // 🌙 MODERN DARK THEME STYLES
  // ------------------------------------------
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "#121212", // Matte Black
      color: "#e0e0e0",
      fontFamily: "'Inter', sans-serif",
    },

    content: {
      flex: 1,
      marginLeft: "260px",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
      color: "#fff",
    },

    card: {
      width: "100%",
      maxWidth: "750px",
      background: "#1e1e1e", // Dark Surface
      padding: "30px",
      borderRadius: "12px",
      marginBottom: "25px",
      border: "1px solid #333",
      borderTop: "4px solid #6a00ff", // Purple Accent
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    },

    sectionTitle: {
      fontSize: "1.3rem",
      fontWeight: "600",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "#fff",
    },

    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#aaa", // Muted text
      fontSize: "0.9rem",
    },

    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#2d2d2d", // Input bg
      color: "#fff",
      marginBottom: "20px",
      fontSize: "1rem",
      outline: "none",
    },

    textarea: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #444",
      background: "#2d2d2d", // Input bg
      color: "#fff",
      minHeight: "120px",
      fontSize: "1rem",
      marginBottom: "20px",
      outline: "none",
      fontFamily: "inherit",
    },

    btn: {
      background: "#6a00ff", // Solid Purple
      color: "#fff",
      padding: "14px 28px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "bold",
      width: "100%",
      maxWidth: "750px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginTop: "15px",
      transition: "0.2s",
    },

    msg: {
      marginTop: "20px",
      padding: "12px",
      borderRadius: "8px",
      fontWeight: "500",
      width: "100%",
      maxWidth: "750px",
      textAlign: "center",
      background: "rgba(74, 222, 128, 0.15)",
      border: "1px solid rgba(74, 222, 128, 0.3)",
      color: "#4ade80",
    }
  };

  return (
    <div style={styles.container}>
      <AdminSidebar />

      <div style={styles.content}>
        <h1 style={styles.header}>Mission & Vision Settings</h1>

        {loading ? (
          <p style={{color: "#888"}}>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "750px" }}>
            
            {/* Mission Section */}
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}><Target size={20} color="#a78bfa"/> Mission</h3>

              <label style={styles.label}>Mission Title</label>
              <input 
                type="text"
                name="mission_title"
                value={formData.mission_title}
                onChange={handleChange}
                style={styles.input}
              />

              <label style={styles.label}>Mission Description</label>
              <textarea
                name="mission_desc"
                value={formData.mission_desc}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            {/* Vision Section */}
            <div style={styles.card}>
              <h3 style={styles.sectionTitle}><Eye size={20} color="#f472b6"/> Vision</h3>

              <label style={styles.label}>Vision Title</label>
              <input 
                type="text"
                name="vision_title"
                value={formData.vision_title}
                onChange={handleChange}
                style={styles.input}
              />

              <label style={styles.label}>Vision Description</label>
              <textarea
                name="vision_desc"
                value={formData.vision_desc}
                onChange={handleChange}
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.btn} disabled={saving}>
              {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {message && <div style={styles.msg}>{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
}