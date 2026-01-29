import React, { useState } from "react";
import { Code2, Database, Server, Globe, Cpu, Cloud, Zap, Layers } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Technologies() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Extended tech stack for a fuller look
  const techs = [
    { name: "React", icon: <Code2 size={32} />, desc: "Frontend Architecture" },
    { name: "Node.js", icon: <Server size={32} />, desc: "Scalable Backend" },
    { name: "MySQL / NoSQL", icon: <Database size={32} />, desc: "Data Management" },
    { name: "Cloud Native", icon: <Cloud size={32} />, desc: "AWS & Azure" },
    { name: "Modern Web", icon: <Globe size={32} />, desc: "PWA & SPA" },
    { name: "AI Integration", icon: <Cpu size={32} />, desc: "Machine Learning" },
    { name: "Fast Performance", icon: <Zap size={32} />, desc: "Optimized Builds" },
    { name: "Microservices", icon: <Layers size={32} />, desc: "Modular Systems" },
  ];

  // Dynamic Styles
  const styles = {
    container: {
      padding: "100px 20px",
      background: isDark 
        ? "radial-gradient(circle at 50% 10%, #1a1a2e 0%, #0a0f1a 100%)" 
        : "radial-gradient(circle at 50% 10%, #f8fafc 0%, #e2e8f0 100%)",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    },
    header: {
      textAlign: "center",
      marginBottom: "60px",
      zIndex: 2,
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: "800",
      marginBottom: "15px",
      background: isDark 
        ? "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)" 
        : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-1px",
    },
    subtitle: {
      color: isDark ? "#94a3b8" : "#64748b",
      fontSize: "1.1rem",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "25px",
      width: "100%",
      maxWidth: "1200px",
      zIndex: 2,
    },
    // Background decoration glow
    blob: {
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "600px",
      background: "radial-gradient(circle, rgba(106, 0, 255, 0.15) 0%, rgba(0,0,0,0) 70%)",
      zIndex: 1,
      pointerEvents: "none",
    }
  };

  return (
    <div style={styles.container}>
      {/* Decorative Glow */}
      <div style={styles.blob} />

      <div style={styles.header}>
        <h1 style={styles.title}>Our Tech Stack</h1>
        <p style={styles.subtitle}>
          We leverage the latest frameworks and robust infrastructure to build scalable, high-performance applications.
        </p>
      </div>

      <div style={styles.grid}>
        {techs.map((t, i) => (
          <TechCard key={i} data={t} isDark={isDark} index={i} />
        ))}
      </div>
    </div>
  );
}

// --- Sub-Component for Interaction Logic ---
function TechCard({ data, isDark, index }) {
  const [hover, setHover] = useState(false);

  const cardStyle = {
    background: isDark 
      ? "rgba(30, 41, 59, 0.4)" 
      : "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", // Safari support
    border: hover 
      ? "1px solid #6a00ff" 
      : (isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)"),
    borderRadius: "20px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // Bouncy transition
    transform: hover ? "translateY(-10px)" : "translateY(0)",
    boxShadow: hover 
      ? "0 20px 40px rgba(106, 0, 255, 0.15)" 
      : "0 4px 10px rgba(0,0,0,0.02)",
    cursor: "default",
    position: "relative",
    overflow: "hidden",
  };

  const iconContainer = {
    color: hover ? "#6a00ff" : (isDark ? "#e2e8f0" : "#334155"),
    background: hover 
      ? "rgba(106, 0, 255, 0.1)" 
      : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"),
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    transition: "all 0.3s ease",
    transform: hover ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)",
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={iconContainer}>
        {data.icon}
      </div>
      
      <h3 style={{ 
        color: isDark ? "#fff" : "#1e293b", 
        fontSize: "1.25rem", 
        fontWeight: "700", 
        marginBottom: "8px" 
      }}>
        {data.name}
      </h3>
      
      <p style={{ 
        color: isDark ? "#94a3b8" : "#64748b", 
        fontSize: "0.9rem", 
        margin: 0 
      }}>
        {data.desc}
      </p>
    </div>
  );
}