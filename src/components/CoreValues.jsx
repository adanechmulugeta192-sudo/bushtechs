import React from "react";
import { Lightbulb, Users, ShieldCheck, Rocket, Zap, Target } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CoreValues() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const values = [
    { icon: <Lightbulb size={28} />, title: "Innovation", desc: "We constantly push boundaries to create futuristic solutions." },
    { icon: <Users size={28} />, title: "Collaboration", desc: "Great things are built together. We value teamwork." },
    { icon: <ShieldCheck size={28} />, title: "Integrity", desc: "Transparency and honesty are the foundation of our work." },
    { icon: <Rocket size={28} />, title: "Excellence", desc: "We don't settle for good. We aim for world-class quality." },
    { icon: <Zap size={28} />, title: "Agility", desc: "Fast execution without compromising on precision." },
    { icon: <Target size={28} />, title: "Client Focus", desc: "Your success is our success. We build for your needs." },
  ];

  // --- STYLES ---
  const styles = {
    section: {
      padding: "100px 20px",
      backgroundColor: isDark ? "#05050a" : "#ffffff",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden"
    },
    header: {
      textAlign: "center",
      marginBottom: "60px",
      position: "relative",
      zIndex: 2
    },
    title: {
      fontFamily: "'Orbitron', sans-serif",
      fontSize: "2.5rem",
      fontWeight: "800",
      color: isDark ? "#ffffff" : "#111827",
      marginBottom: "15px"
    },
    subtitle: {
      color: isDark ? "#9ca3af" : "#4b5563",
      fontSize: "1.1rem"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2
    },
    card: {
      backgroundColor: isDark ? "rgba(20, 20, 30, 0.6)" : "#f8f9fa",
      // ✅ FIX: We use specific border properties to avoid the React Warning
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
      borderRadius: "20px",
      padding: "35px",
      backdropFilter: "blur(12px)",
      transition: "0.3s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px"
    },
    iconBox: {
      width: "55px",
      height: "55px",
      borderRadius: "14px",
      background: "linear-gradient(135deg, #d900ff 0%, #00d2ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      boxShadow: "0 10px 25px rgba(217, 0, 255, 0.3)"
    },
    cardTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: isDark ? "#ffffff" : "#111827"
    },
    cardDesc: {
      color: isDark ? "#9ca3af" : "#4b5563",
      lineHeight: "1.6"
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Our Core Values</h2>
        <p style={styles.subtitle}>The principles that drive our engineering and design.</p>
        <div style={{ width: "60px", height: "4px", background: "#d900ff", margin: "20px auto", borderRadius: "2px" }}></div>
      </div>

      <div style={styles.grid}>
        {values.map((item, index) => (
          <div 
            key={index} 
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.borderColor = "#d900ff";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(217, 0, 255, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              // ✅ Resetting specific border color to match initial state
              e.currentTarget.style.borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={styles.iconBox}>{item.icon}</div>
            <div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}