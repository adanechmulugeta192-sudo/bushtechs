import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Target, Eye, Loader2, Zap } from "lucide-react";

// API CONFIG
const API_BASE = "http://localhost:5000";

export default function MissionVision() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    fetch(`${API_BASE}/api/mission-vision`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // --- STYLES ---
  const styles = {
    section: {
      padding: "120px 20px",
      backgroundColor: isDark ? "#05050a" : "#f8fafc",
      position: "relative",
      overflow: "hidden"
    },
    container: {
      maxWidth: "1100px",
      width: "100%",
      margin: "0 auto",
      position: "relative",
      zIndex: 2
    },
    header: {
      textAlign: "center",
      marginBottom: "70px"
    },
    badge: {
      display: "inline-flex", 
      alignItems: "center", 
      gap: "8px", 
      background: isDark ? "rgba(0, 210, 255, 0.1)" : "rgba(0, 210, 255, 0.1)", 
      padding: "6px 14px", 
      borderRadius: "30px", 
      marginBottom: "20px",
      border: "1px solid rgba(0, 210, 255, 0.2)",
      color: "#00d2ff", 
      fontSize: "0.85rem", 
      fontWeight: "600", 
      textTransform: "uppercase", 
      letterSpacing: "1px"
    },
    title: {
      fontSize: "3rem",
      fontWeight: "800",
      color: isDark ? "#ffffff" : "#1a1a2e",
      fontFamily: "'Orbitron', sans-serif",
      marginBottom: "15px",
    },
    gradientText: {
      background: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },
    subHeader: {
      color: isDark ? "#94a3b8" : "#64748b", 
      fontSize: "1.1rem", 
      maxWidth: "600px", 
      margin: "0 auto",
      lineHeight: "1.6"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
      gap: "40px",
    },
    card: {
      background: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
      backdropFilter: "blur(20px)", 
      padding: "50px 40px",
      borderRadius: "24px",
      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
      boxShadow: isDark ? "0 10px 30px -10px rgba(0,0,0,0.5)" : "0 20px 40px -10px rgba(0,0,0,0.05)",
      position: "relative",
      overflow: "hidden",
      transition: "transform 0.3s ease"
    },
    // Icon container style
    iconBox: (color, bg) => ({
      width: "70px",
      height: "70px",
      borderRadius: "18px",
      background: bg,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "30px",
      boxShadow: `0 10px 20px ${bg}`
    }),
    cardTitle: {
      fontSize: "2rem",
      color: isDark ? "#ffffff" : "#1e293b",
      marginBottom: "20px",
      fontWeight: "700",
      fontFamily: "'Orbitron', sans-serif",
    },
    cardText: {
      fontSize: "1.1rem",
      lineHeight: "1.8",
      color: isDark ? "#cbd5e1" : "#475569",
    },
    // Decorative top line
    topLine: (gradient) => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      background: gradient
    })
  };

  if (loading) return (
    <div style={{padding: "100px", textAlign: "center", color: styles.text}}>
      <Loader2 className="animate-spin" size={40} color="#00d2ff"/>
    </div>
  );

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Zap size={14} /> <span>Our Core Identity</span>
          </div>
          <h1 style={styles.title}>
            Driving <span style={styles.gradientText}>Innovation</span>
          </h1>
          <p style={styles.subHeader}>
            We are defined by our commitment to excellence and our vision for a connected future.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={styles.grid}>
          
          {/* Mission Card */}
          <div style={styles.card}>
            <div style={styles.topLine("linear-gradient(90deg, #00d2ff, #3a7bd5)")}></div>
            
            <div style={styles.iconBox("#00d2ff", "rgba(0, 210, 255, 0.1)")}>
              <Target size={32} />
            </div>
            
            <h2 style={styles.cardTitle}>
              {data?.mission_title || "Our Mission"}
            </h2>
            <p style={styles.cardText}>
              {data?.mission_desc || "To empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation."}
            </p>
          </div>

          {/* Vision Card */}
          <div style={styles.card}>
             <div style={styles.topLine("linear-gradient(90deg, #ff91f9, #c94b4b)")}></div>

            <div style={styles.iconBox("#ff91f9", "rgba(255, 145, 249, 0.1)")}>
              <Eye size={32} />
            </div>

            <h2 style={styles.cardTitle}>
              {data?.vision_title || "Our Vision"}
            </h2>
            <p style={styles.cardText}>
              {data?.vision_desc || "To be the world's leading provider of cutting-edge digital infrastructure, setting new standards for quality and reliability."}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}