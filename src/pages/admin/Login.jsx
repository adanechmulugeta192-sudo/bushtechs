import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, AlertCircle, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ✅ IMPORT YOUR LOGO HERE
import logo from "../../assets/favicon.png"; 

const API_BASE = "http://localhost:5000";

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); 
        navigate("/admin/projects");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // --- COLORS & THEME ---
  const accentColor = "#d900ff"; // BushTechs Neon Purple
  const secondaryColor = "#6a00ff"; // Deep Purple

  const styles = {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isDark 
        ? "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #05050a 100%)" 
        : "radial-gradient(circle at 50% 0%, #f0f4ff 0%, #dde1e7 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    },
    // Animated Background Orbs
    orb1: {
      position: "absolute",
      top: "-10%", left: "-10%",
      width: "500px", height: "500px",
      background: secondaryColor,
      filter: "blur(150px)",
      opacity: 0.4,
      borderRadius: "50%",
      zIndex: 0,
      animation: "float 8s ease-in-out infinite", 
    },
    orb2: {
      position: "absolute",
      bottom: "-10%", right: "-10%",
      width: "400px", height: "400px",
      background: accentColor,
      filter: "blur(150px)",
      opacity: 0.3,
      borderRadius: "50%",
      zIndex: 0,
      animation: "float 10s ease-in-out infinite reverse", 
    },
    // The Glass Card
    card: {
      width: "100%",
      maxWidth: "420px",
      padding: "45px",
      borderRadius: "24px",
      background: isDark ? "rgba(20, 20, 30, 0.6)" : "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(255, 255, 255, 0.5)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      zIndex: 10,
      animation: "fadeInUp 0.8s ease-out",
      boxSizing: "border-box", // Added safety for the card itself
    },
    logoArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "35px",
    },
    // Logo Styling
    logoImg: {
      width: "80px",
      height: "80px",
      objectFit: "contain",
      marginBottom: "15px",
      filter: isDark ? "drop-shadow(0 0 10px rgba(217, 0, 255, 0.5))" : "none",
      animation: "pulse 3s infinite ease-in-out", 
    },
    brandName: {
      fontSize: "1.8rem",
      fontWeight: "800",
      color: isDark ? "#fff" : "#1a1a2e",
      fontFamily: "'Orbitron', sans-serif",
      letterSpacing: "2px",
    },
    subtitle: {
      fontSize: "0.9rem",
      color: isDark ? "#94a3b8" : "#64748b",
      marginTop: "5px",
    },
    inputGroup: { 
      position: "relative", 
      marginBottom: "20px",
      opacity: 0, 
      animation: "slideIn 0.5s forwards", 
      width: "100%", // Ensure group takes full width
    },
    inputIcon: {
      position: "absolute",
      top: "50%", left: "16px",
      transform: "translateY(-50%)",
      color: "#a1a1aa",
      transition: "0.3s",
      zIndex: 2, // Keep icon above input background
    },
    input: {
      // ✅ THIS FIXES THE ISSUE:
      boxSizing: "border-box", 
      width: "100%",
      padding: "16px 16px 16px 48px",
      borderRadius: "12px",
      border: "2px solid transparent",
      background: isDark ? "rgba(0, 0, 0, 0.25)" : "#f1f5f9",
      color: isDark ? "#fff" : "#333",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.3s ease",
    },
    btn: {
      width: "100%",
      padding: "16px",
      background: `linear-gradient(135deg, ${secondaryColor}, ${accentColor})`,
      border: "none",
      borderRadius: "12px",
      color: "white",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      marginTop: "15px",
      display: "flex", justifyContent: "center", alignItems: "center", gap: "8px",
      boxShadow: "0 10px 25px -5px rgba(106, 0, 255, 0.4)",
      transition: "all 0.3s ease",
      animation: "slideIn 0.5s forwards",
      animationDelay: "0.3s",
      opacity: 0,
    },
    error: {
      background: "rgba(239, 68, 68, 0.1)",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      color: "#ef4444",
      padding: "12px", borderRadius: "10px", marginBottom: "20px",
      display: "flex", alignItems: "center", gap: "10px",
      fontSize: "0.9rem", fontWeight: "500",
      animation: "shake 0.4s ease-in-out",
    },
    footer: {
      textAlign: "center", marginTop: "25px",
      fontSize: "0.8rem", color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)",
      animation: "fadeInUp 1s ease-out",
    }
  };

  // Dynamic styling for focused inputs
  const getInputStyle = (fieldName) => ({
    ...styles.input,
    border: focusedInput === fieldName ? `2px solid ${accentColor}` : "2px solid transparent",
    background: focusedInput === fieldName 
      ? (isDark ? "rgba(0, 0, 0, 0.4)" : "#fff") 
      : styles.input.background,
    transform: focusedInput === fieldName ? "scale(1.02)" : "scale(1)", 
  });

  const getIconStyle = (fieldName) => ({
    ...styles.inputIcon,
    color: focusedInput === fieldName ? accentColor : "#a1a1aa"
  });

  return (
    <div style={styles.container}>
      {/* 🌀 CSS ANIMATIONS DEFINITION */}
      <style>{`
        @keyframes float { 
          0% { transform: translate(0px, 0px); } 
          50% { transform: translate(20px, -20px); } 
          100% { transform: translate(0px, 0px); } 
        }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes slideIn { 
          from { opacity: 0; transform: translateX(-20px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes pulse { 
          0% { transform: scale(1); } 
          50% { transform: scale(1.05); } 
          100% { transform: scale(1); } 
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        input::placeholder { color: ${isDark ? '#555' : '#999'}; }
        * { box-sizing: border-box; } /* Global safety for this page */
      `}</style>

      {/* Background Visuals */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div style={styles.card}>
        <div style={styles.logoArea}>
          {/* ✅ YOUR LOGO IS USED HERE */}
          <img src={logo} alt="BushTechs Logo" style={styles.logoImg} />
          
          <div style={styles.brandName}>BUSHTECHS</div>
          <p style={styles.subtitle}>Sign in to access your dashboard</p>
        </div>
        
        {error && <div style={styles.error}><AlertCircle size={18}/> {error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div style={{...styles.inputGroup, animationDelay: "0.1s"}}>
            <User size={20} style={getIconStyle('username')} />
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

          {/* Password Input */}
          <div style={{...styles.inputGroup, animationDelay: "0.2s"}}>
            <Lock size={20} style={getIconStyle('password')} />
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

          <button 
            type="submit" 
            style={styles.btn} 
            disabled={loading}
            onMouseOver={(e) => {
              if(!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 30px -5px rgba(106, 0, 255, 0.6)";
              }
            }}
            onMouseOut={(e) => {
              if(!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(106, 0, 255, 0.4)";
              }
            }}
          >
            {loading ? "Authenticating..." : <>Login to Dashboard <ArrowRight size={18} /></>}
          </button>
        </form>

        <div style={styles.footer}>
          © 2025 BushTechs. All rights reserved.
        </div>
      </div>
    </div>
  );
}