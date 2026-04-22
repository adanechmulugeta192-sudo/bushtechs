import React, { useState, useEffect } from "react";
import { Lock, Save, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function AdminChangePassword() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [status, setStatus] = useState({ loading: false, type: "", msg: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      // Support for different ID naming conventions (id or _id)
      setUserId(parsed.id || parsed._id);
    } else {
      console.warn("No user found in localStorage, redirecting...");
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, type: "", msg: "" });

    // Client-side Validation
    if (!userId) {
      setStatus({ loading: false, type: "error", msg: "User ID missing. Please login again." });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ loading: false, type: "error", msg: "New passwords do not match!" });
      return;
    }
    if (formData.newPassword.length < 6) {
      setStatus({ loading: false, type: "error", msg: "Password must be at least 6 characters." });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/auth/change-password`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          // ✅ ADDED AUTHORIZATION HEADER
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          userId: userId,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, type: "success", msg: "✅ Password changed successfully!" });
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setStatus({ loading: false, type: "error", msg: data.error || data.message || "Failed to update." });
      }
    } catch (err) {
      console.error("Password change error:", err);
      setStatus({ loading: false, type: "error", msg: "Server connection error." });
    }
  };

  // Styles
  const styles = {
    container: { padding: "40px", maxWidth: "600px", margin: "0 auto", color: isDark ? "#fff" : "#333" },
    card: {
      background: isDark ? "rgba(20, 20, 30, 0.6)" : "#ffffff",
      backdropFilter: "blur(12px)",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e5e7eb",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    title: { fontFamily: "'Orbitron', sans-serif", fontSize: "1.8rem", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px", color: isDark ? "#fff" : "#111" },
    inputGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "8px", fontSize: "0.9rem", opacity: 0.8 },
    input: {
      width: "100%", padding: "12px", borderRadius: "10px",
      border: "1px solid rgba(100,100,100,0.2)",
      background: isDark ? "rgba(0,0,0,0.3)" : "#f9fafb",
      color: isDark ? "#fff" : "#333", outline: "none",
    },
    btn: {
      width: "100%", padding: "14px", background: "linear-gradient(90deg, #d900ff, #00d2ff)",
      border: "none", borderRadius: "50px", color: "white", fontWeight: "bold",
      cursor: status.loading ? "not-allowed" : "pointer", marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px",
      opacity: status.loading ? 0.7 : 1
    },
    msg: { padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}><Lock size={28} color="#d900ff" /> Security</h2>

        {status.msg && (
          <div style={{ 
            ...styles.msg, 
            background: status.type === "success" ? "rgba(74, 222, 128, 0.1)" : "rgba(248, 113, 113, 0.1)", 
            color: status.type === "success" ? "#4ade80" : "#f87171",
            border: `1px solid ${status.type === "success" ? "rgba(74, 222, 128, 0.2)" : "rgba(248, 113, 113, 0.2)"}`
          }}>
            {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {status.msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Current Password</label>
            <input type="password" name="currentPassword" style={styles.input} value={formData.currentPassword} onChange={handleChange} required autoComplete="current-password" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <input type="password" name="newPassword" style={styles.input} value={formData.newPassword} onChange={handleChange} required autoComplete="new-password" />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <input type="password" name="confirmPassword" style={styles.input} value={formData.confirmPassword} onChange={handleChange} required autoComplete="new-password" />
          </div>

          <button type="submit" style={styles.btn} disabled={status.loading}>
            {status.loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {status.loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
      <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
