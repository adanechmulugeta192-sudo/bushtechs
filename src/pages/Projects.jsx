import React, { useEffect, useState } from "react";
import { MapPin, CheckCircle2, ArrowUpRight, ExternalLink, Calendar, Loader2 } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg"; // Kept as requested
import { useTheme } from "../context/ThemeContext"; 

// API Base URL
const API_URL = "http://localhost:5000/api/projects";
const SERVER_URL = "http://localhost:5000"; // For images

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  // 1. STATE FOR DATA
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. FETCH DATA FROM BACKEND
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ✅ HELPER: Fixes image paths to ensure they are visible
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400?text=No+Image";
    
    // If it's already a full web link, return it
    if (img.startsWith("http")) return img; 
    
    // ✅ FIX: Replace backslashes (Windows) with forward slashes
    // AND ensure there is a slash '/' at the start
    const cleanImg = img.replace(/\\/g, "/");
    const finalPath = cleanImg.startsWith("/") ? cleanImg : `/${cleanImg}`;

    return `${SERVER_URL}${finalPath}`; 
  };

  const openProject = (url) => {
    if (url && url !== "#") window.open(url, "_blank");
  };

  // --- THEME STYLES ---
  const styles = {
    bg: isDark ? "#05050a" : "#f8f9fa",
    title: isDark ? "#ffffff" : "#111827",
    cardBg: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
    cardBorder: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.1)",
    meta: isDark ? "#94a3b8" : "#64748b",
    desc: isDark ? "#cbd5e1" : "#475569",
  };

  return (
    <section style={{ backgroundColor: styles.bg, padding: "100px 0", minHeight: "100vh", position: "relative" }}>
      {/* Header */}
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "3rem", color: styles.title, marginBottom: "10px" }}>Success Stories</h2>
          <div style={{ width: "60px", height: "4px", background: "#ff91f9", margin: "0 auto" }}></div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ textAlign: "center", padding: "50px", color: "#6a00ff" }}>
            <Loader2 size={48} className="animate-spin" style={{ margin: "0 auto" }} />
            <p style={{ marginTop: "20px" }}>Loading Projects...</p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
            <p>Error: {error}</p>
            <p>Is your backend server running?</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && projects.length === 0 && (
          <div style={{ textAlign: "center", color: styles.desc }}>
            <p>No projects found in the database yet.</p>
          </div>
        )}

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          {projects.map((project) => (
            <article 
              key={project.id || project._id} // Added fallback for MongoDB _id
              style={{ background: styles.cardBg, border: styles.cardBorder, borderRadius: "16px", overflow: "hidden", transition: "0.3s", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              onClick={() => openProject(project.link)}
            >
              <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                <img 
                  src={getImageUrl(project.image)} 
                  alt={project.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.5s" }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found"; }}
                />
                <div style={{ position: "absolute", top: "15px", left: "15px", background: "rgba(0,0,0,0.8)", color: "#ff91f9", padding: "5px 12px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "bold", textTransform: "uppercase" }}>
                  {project.category || "Project"}
                </div>
              </div>

              <div style={{ padding: "25px" }}>
                <div style={{ display: "flex", gap: "15px", color: styles.meta, fontSize: "0.85rem", marginBottom: "10px" }}>
                  {project.location && <span><MapPin size={14} style={{display:"inline"}}/> {project.location}</span>}
                  {project.year && <span><Calendar size={14} style={{display:"inline"}}/> {project.year}</span>}
                </div>

                <h3 style={{ color: styles.title, fontSize: "1.4rem", margin: "0 0 10px 0" }}>{project.title}</h3>
                <p style={{ color: styles.desc, fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "20px" }}>{project.description}</p>

                <div style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#34d399", fontSize: "0.8rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                    <CheckCircle2 size={14} /> {project.status || "Completed"}
                  </span>
                  {project.link && (
                    <button style={{ background: "none", border: "none", color: "#ff91f9", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                      Visit Site <ArrowUpRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}