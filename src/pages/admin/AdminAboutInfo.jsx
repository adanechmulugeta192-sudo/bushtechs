import React, { useState, useEffect } from "react";
import { Save, Layers, Users, Calendar, Type, Activity } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const API_BASE = "http://localhost:5000";

export default function AdminAboutInfo() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State for the main text content
  const [content, setContent] = useState({
    sectionTitle: "Who We Are",
    mainHeadline: "About BushTechs Solutions",
    subHeadline: "Safe, comprehensive, and fast platform.",
    description: "BushTechs builds modern, secure, and scalable digital products that empower businesses to move faster. We blend enterprise-grade engineering with creative innovation.",
  });

  // State for the Statistics Bar
  const [stats, setStats] = useState({
    engineers: "5+",
    customers: "15+",
    projects: "15+",
    established: "2025",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // --- 1. FETCH DATA (Mocking the endpoint logic) ---
  useEffect(() => {
    // In a real scenario, you would fetch from `${API_BASE}/api/about-info`
    /*
    fetch(`${API_BASE}/api/about-info`)
      .then(res => res.json())
      .then(data => {
         if(data.content) setContent(data.content);
         if(data.stats) setStats(data.stats);
      })
      .catch(err => console.error(err));
    */
  }, []);

  // --- 2. HANDLERS ---
  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatsChange = (e) => {
    const { name, value } = e.target;
    setStats((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Example PUT request
      const response = await fetch(`${API_BASE}/api/about-info`, {
        method: "PUT", // or POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, stats }),
      });

      if (response.ok) {
        setMessage("✅ About page info updated successfully!");
      } else {
        setMessage("❌ Failed to update info.");
      }
    } catch (error) {
      console.error("Error updating:", error);
      setMessage("❌ Server error.");
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES ---
  const styles = {
    container: {
      padding: "2rem",
      color: isDark ? "#fff" : "#333",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "2rem",
      borderBottom: `1px solid ${isDark ? "#333" : "#ddd"}`,
      paddingBottom: "1rem",
    },
    sectionCard: {
      background: isDark ? "#1e293b" : "#fff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      marginBottom: "2rem",
      border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
    },
    row: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
      marginBottom: "1rem",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "600",
      color: isDark ? "#94a3b8" : "#475569",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#475569" : "#cbd5e1"}`,
      background: isDark ? "#0f172a" : "#f8fafc",
      color: isDark ? "#fff" : "#333",
      fontSize: "1rem",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "8px",
      border: `1px solid ${isDark ? "#475569" : "#cbd5e1"}`,
      background: isDark ? "#0f172a" : "#f8fafc",
      color: isDark ? "#fff" : "#333",
      fontSize: "1rem",
      minHeight: "120px",
      resize: "vertical",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "1.5rem",
      color: "#6a00ff", // Brand purple
    },
    btn: {
      background: "linear-gradient(90deg, #6a00ff, #ff91f9)",
      color: "#fff",
      border: "none",
      padding: "1rem 2rem",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      transition: "opacity 0.3s",
    },
    message: {
      marginTop: "1rem",
      padding: "1rem",
      borderRadius: "8px",
      background: message.includes("✅") 
        ? (isDark ? "rgba(74, 222, 128, 0.2)" : "#dcfce7") 
        : (isDark ? "rgba(248, 113, 113, 0.2)" : "#fee2e2"),
      color: message.includes("✅") 
        ? (isDark ? "#4ade80" : "#166534") 
        : (isDark ? "#f87171" : "#991b1b"),
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Edit About Page Info</h1>
        <p style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
          Update the main text and statistics displayed on the About Us page.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        
        {/* SECTION 1: TEXT CONTENT */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <Type size={24} />
            <h2>Text Content</h2>
          </div>
          
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Section Tag (Small Top Text)</label>
              <input 
                type="text" 
                name="sectionTitle"
                value={content.sectionTitle}
                onChange={handleContentChange}
                style={styles.input} 
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Main Headline (H1)</label>
              <input 
                type="text" 
                name="mainHeadline"
                value={content.mainHeadline}
                onChange={handleContentChange}
                style={styles.input} 
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Sub Headline (H3)</label>
            <input 
              type="text" 
              name="subHeadline"
              value={content.subHeadline}
              onChange={handleContentChange}
              style={styles.input} 
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description Paragraph</label>
            <textarea 
              name="description"
              value={content.description}
              onChange={handleContentChange}
              style={styles.textarea} 
            />
          </div>
        </div>

        {/* SECTION 2: STATISTICS */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            <Activity size={24} />
            <h2>Statistics Bar</h2>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}><Users size={16} style={{marginRight:5}}/> Engineers Count</label>
              <input 
                type="text" 
                name="engineers"
                value={stats.engineers}
                onChange={handleStatsChange}
                style={styles.input} 
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><Users size={16} style={{marginRight:5}}/> Customers Count</label>
              <input 
                type="text" 
                name="customers"
                value={stats.customers}
                onChange={handleStatsChange}
                style={styles.input} 
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}><Layers size={16} style={{marginRight:5}}/> Projects Count</label>
              <input 
                type="text" 
                name="projects"
                value={stats.projects}
                onChange={handleStatsChange}
                style={styles.input} 
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}><Calendar size={16} style={{marginRight:5}}/> Year Established</label>
              <input 
                type="text" 
                name="established"
                value={stats.established}
                onChange={handleStatsChange}
                style={styles.input} 
              />
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button type="submit" style={styles.btn} disabled={loading}>
          <Save size={20} />
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {message && <div style={styles.message}>{message}</div>}

      </form>
    </div>
  );
}