import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ✅ ENSURE THIS PATH IS CORRECT
import logo from "../../assets/favicon.png"; 

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function Login() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ SAVE DATA FOR ADMIN ACCESS
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); 
        
        // Redirect to a default admin page (e.g., Dashboard or Projects)
        navigate("/admin/dashboard"); 
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Connection failed. Is the backend server awake?");
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES ---
  const accentColor = "#d900ff";
  const secondaryColor = "#6a00ff";

  const styles = {
    container: { height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", background: isDark ? "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #05050a 100%)" : "radial-gradient(circle at 50% 0%, #f0f4ff 0%, #dde1e7 100%)", position: "relative", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
    orb1: { position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", background: secondaryColor, filter: "blur(150px)", opacity: 0.4, borderRadius: "50%", zIndex: 0 },
    orb2: { position: "absolute", bottom: "-10%", right: "-10%", width: "400px", height: "400px", background: accentColor, filter: "blur(150px)", opacity: 0.3, borderRadius: "50%", zIndex: 0 },
    card: { width: "100%", maxWidth: "420px", padding: "45px", borderRadius: "24px", background: isDark ? "rgba(20, 20, 30, 0.6)" : "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)", border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.5)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", zIndex: 10, boxSizing: "border-box" },
    logoArea: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "35px" },
    logoImg: { width: "80px", height: "80px", objectFit: "contain", marginBottom: "15px", filter: isDark ? "drop-shadow(0 0 10px rgba(217, 0, 255, 0.5))" : "none" },
    brandName: { fontSize: "1.8rem", fontWeight: "800", color: isDark ? "#fff" : "#1a1a2e", fontFamily: "'Orbitron', sans-serif", letterSpacing: "2px" },
    subtitle: { fontSize: "0.9rem", color: isDark ? "#94a3b8" : "#64748b", marginTop: "5px" },
    inputGroup: { position: "relative", marginBottom: "20px", width: "100%" },
    inputIcon: { position: "absolute", top: "50%", left: "16px", transform: "translateY(-50%)", color: "#a1a1aa", transition: "0.3s", zIndex: 2 },
    input: { boxSizing: "border-box", width: "100%", padding: "16px 16px 16px 48px", borderRadius: "12px", border: "2px solid transparent", background: isDark ? "rgba(0, 0, 0, 0.25)" : "#f1f5f9", color: isDark ? "#fff" : "#333", fontSize: "0.95rem", outline: "none", transition: "all 0.3s ease" },
    btn: { width: "100%", padding: "16px", background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})`, border: "none", borderRadius: "12px", color: "white", fontWeight: "600", fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", marginTop: "15px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", boxShadow: "0 10px 25px -5px rgba(106, 0, 255, 0.4)", transition: "all 0.3s ease", opacity: loading ? 0.7 : 1 },
    error: { background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "12px", borderRadius: "10px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", fontWeight: "500" },
    footer: { textAlign: "center", marginTop: "25px", fontSize: "0.8rem", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)" }
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    border: focusedInput === fieldName ? `2px solid ${accentColor}` : "2px solid transparent",
    transform: focusedInput === fieldName ? "scale(1.01)" : "scale(1)", 
  });

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes float { 0% { transform: translate(0,0); } 50% { transform: translate(15px,-15px); } 100% { transform: translate(0,0); } }
        .orb-anim { animation: float 10s ease-in-out infinite; }
        input::placeholder { color: #888; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={styles.orb1} className="orb-anim"></div>
      <div style={styles.orb2} className="orb-anim"></div>

      <div style={styles.card}>
        <div style={styles.logoArea}>
          <img src={logo} alt="Logo" style={styles.logoImg} />
          <div style={styles.brandName}>BUSHTECHS</div>
          <p style={styles.subtitle}>Admin Portal</p>
        </div>
        
        {error && <div style={styles.error}><AlertCircle size={18}/> {error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <User size={20} style={{...styles.inputIcon, color: focusedInput === 'username' ? accentColor : '#a1a1aa'}} />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              style={getInputStyle('username')}
              value={formData.username} 
              onChange={handleChange} 
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock size={20} style={{...styles.inputIcon, color: focusedInput === 'password' ? accentColor : '#a1a1aa'}} />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              style={getInputStyle('password')}
              value={formData.password} 
              onChange={handleChange} 
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              required 
            />
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
            {loading ? "Verifying..." : "Login to Dashboard"} <ArrowRight size={18} />
          </button>
        </form>

        <div style={styles.footer}>© 2026 BushTechs Solutions</div>
      </div>
    </div>
  );
}
