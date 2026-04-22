import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle2, ArrowUpRight, Calendar, Loader2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; 

// --- ✅ DYNAMIC API CONFIGURATION ---
// This handles the switch between local development and Render production automatically
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

// Routes match your server.js (app.use("/api/projects", ...))
const API_URL = `${API_BASE}/api/projects`;

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // ✅ Fetches from /api/projects
        const response = await fetch(API_URL);
        
        if (!response.ok) {
           throw new Error(`Server responded with ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ✅ HELPER: Fixes image paths dynamically for Render
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400?text=No+Image";
    
    // If it's already a full URL (like from a cloud bucket), return it
    if (img.startsWith("http")) return img; 
    
    // Clean up Windows-style backslashes from DB paths
    const cleanImg = img.replace(/\\/g, "/");
    const finalPath = cleanImg.startsWith("/") ? cleanImg : `/${cleanImg}`;

    // Links the image to the base domain of your Render server
    return `${API_BASE}${finalPath}`; 
  };

  const openProject = (url) => {
    if (url && url !== "#") window.open(url, "_blank");
  };

  // --- THEME STYLES ---
  const styles = {
    bg: isDark ? "#05050a" : "#f8f9fa",
    title: isDark ? "#ffffff" : "#111827",
    cardBg: isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
    cardBorder: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
    meta: isDark ? "#94a3b8" : "#64748b",
    desc: isDark ? "#cbd5e1" : "#475569",
    accent: "#ff91f9"
  };

  return (
    <section style={{ backgroundColor: styles.bg, padding: "100px 0", minHeight: "100vh", position: "relative", transition: "0.3s ease" }}>
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 2 }}>
        
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "3rem", color: styles.title, marginBottom: "10px" }}>
            Success Stories
          </h2>
          <div style={{ width: "60px", height: "4px", background: styles.accent, margin: "0 auto" }}></div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ textAlign: "center", padding: "50px", color: "#6a00ff" }}>
            <Loader2 size={48} className="animate-spin" style={{ margin: "0 auto" }} />
            <p style={{ marginTop: "20px", color: styles.meta }}>Waking up server...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div style={{ textAlign: "center", padding: "50px", border: `1px dashed ${isDark ? "#333" : "#ccc"}`, borderRadius: "12px" }}>
            <p style={{ color: "#ef4444", fontWeight: "bold" }}>⚠️ Connection Failed</p>
            <p style={{ color: styles.meta }}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ marginTop: "15px", padding: "8px 20px", background: styles.accent, border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
            >
              Retry
            </button>
          </div>
        )}

        {/* GRID */}
        {!loading && !error && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <article 
                  key={project.id} 
                  style={{ 
                    background: styles.cardBg, 
                    border: styles.cardBorder, 
                    borderRadius: "16px", 
                    overflow: "hidden", 
                    transition: "0.3s", 
                    cursor: "pointer",
                    boxShadow: isDark ? "none" : "0 4px 6px -1px rgba(0,0,0,0.05)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.borderColor = styles.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = styles.cardBorder;
                  }}
                  onClick={() => openProject(project.link)}
                >
                  <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                    <img 
                      src={getImageUrl(project.image)} 
                      alt={project.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found"; }}
                    />
                    <div style={{ 
                      position: "absolute", top: "15px", left: "15px", 
                      background: "rgba(0,0,0,0.8)", color: styles.accent, 
                      padding: "5px 12px", borderRadius: "20px", 
                      fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase" 
                    }}>
                      {project.category || "Solutions"}
                    </div>
                  </div>

                  <div style={{ padding: "25px" }}>
                    <div style={{ display: "flex", gap: "15px", color: styles.meta, fontSize: "0.85rem", marginBottom: "12px" }}>
                      {project.location && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={14} /> {project.location}</span>}
                      {project.year && <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={14} /> {project.year}</span>}
                    </div>

                    <h3 style={{ color: styles.title, fontSize: "1.4rem", margin: "0 0 10px 0", fontFamily: "'Montserrat', sans-serif" }}>
                      {project.title}
                    </h3>
                    <p style={{ color: styles.desc, fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px" }}>
                      {project.description}
                    </p>

                    <div style={{ 
                      borderTop: styles.cardBorder, 
                      paddingTop: "15px", display: "flex", 
                      justifyContent: "space-between", alignItems: "center" 
                    }}>
                      <span style={{ color: "#34d399", fontSize: "0.8rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                        <CheckCircle2 size={14} /> {project.status || "Completed"}
                      </span>
                      {project.link && (
                        <span style={{ color: styles.accent, fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.9rem" }}>
                          Case Study <ArrowUpRight size={16} />
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: styles.meta, padding: "40px" }}>
                No projects found in the records.
              </div>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
