import React from "react";
import { MapPin, CheckCircle2, ArrowUpRight, ExternalLink, Calendar } from "lucide-react";

// Replace these with your actual image paths
import heroBg from "../assets/1hero-bg.jpg";
import projectImg1 from "../assets/1project-1.jpg";
import { useTheme } from "../context/ThemeContext";

const PROJECTS = [
  { 
    id: 1,
    title: "Hope Energy",
    img: projectImg1, 
    category: "Renewable Energy Web Platform",
    description: "Hope Energy pioneers renewable energy solutions to power communities across Ethiopia with sustainable innovation.",
    location: "Addis Ababa",
    status: "Completed",
    year: "2025",
    link: "https://bushtechs-32jb.vercel.app/"
  },
  { 
    id: 2,
    title: "KumaCon General Construction",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    category: "Construction & Engineering Website",
    description: "A modern, scalable website showcasing construction, infrastructure development, engineering excellence and project delivery.",
    location: "Addis Ababa",
    status: "Completed",
    year: "2025",
    link: "https://kumacon1-frontend.vercel.app/" 
  }
];

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /**
   * FIXED LINK LOGIC
   * 1. Stops propagation so clicking the button doesn't "double click" the card.
   * 2. Uses noopener/noreferrer for security.
   */
  const handleOpenLink = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8f9fa",
    "--text-title": isDark ? "#ffffff" : "#111827",
    "--text-body": isDark ? "#cbd5e1" : "#475569",
    "--text-meta": isDark ? "#94a3b8" : "#64748b",
    "--card-bg": isDark ? "rgba(255, 255, 255, 0.03)" : "#ffffff",
    "--card-border": isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
    "--card-shadow": isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.05)",
    "--overlay-gradient": isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(5,5,10,0.8) 40%, #05050a 100%)"
      : "linear-gradient(to bottom, #f8f9fa 0%, rgba(255,255,255,0.8) 40%, #f8f9fa 100%)",
    "--badge-bg": isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
    "--badge-text": isDark ? "#ff91f9" : "#d946ef",
    "--btn-color": isDark ? "#ff91f9" : "#6a00ff",
  };

  return (
    <section className="projects-section" id="projects" style={themeVars}>
      
      {/* Animated Top Wave Header */}
      <div className="tech-wave-top">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
            <defs>
                <linearGradient id="wave-gradient" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#6a00ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ff91f9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path 
                d="M0,50 C320,120 520,-40 920,50 C1220,120 1340,20 1440,40" 
                stroke="url(#wave-gradient)" 
                strokeWidth="2" 
                fill="none"
                className="animated-path"
            />
        </svg>
      </div>

      <div className="bg-image-layer" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="bg-overlay-layer" />
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our <span className="highlight">Success Stories</span></h2>
          <p className="section-subtitle">
            Pioneering excellence in Renewable Energy and Infrastructure development.
          </p>
          <div className="title-accent"></div>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <article 
              key={project.id} 
              className="project-card"
              onClick={(e) => handleOpenLink(e, project.link)}
            >
              <div className="image-container">
                <img src={project.img} alt={project.title} className="project-img" />
                <div className="category-tag">{project.category}</div>
                
                {/* Visual Hover State (Pointer events none so it doesn't block click) */}
                <div className="image-overlay">
                   <div className="overlay-btn">
                      View Live Site <ExternalLink size={16} />
                   </div>
                </div>
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="meta-info"><MapPin size={14} /> {project.location}</span>
                  <span className="meta-info"><Calendar size={14} /> {project.year}</span>
                </div>
                
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>

                <div className="card-footer">
                    <span className="status-pill">
                        <CheckCircle2 size={14} /> {project.status}
                    </span>
                    <button 
                      className="visit-action-btn"
                      onClick={(e) => handleOpenLink(e, project.link)}
                    >
                        Visit <ArrowUpRight size={18} />
                    </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .projects-section {
          position: relative;
          padding: 100px 20px;
          background-color: var(--bg-color);
          color: var(--text-title);
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          transition: background 0.4s ease;
        }

        .tech-wave-top { position: absolute; top: 0; left: 0; width: 100%; height: 80px; z-index: 5; pointer-events: none; }
        .animated-path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 3s forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }

        .bg-image-layer { position: absolute; inset: 0; opacity: 0.05; background-size: cover; background-position: center; pointer-events: none; }
        .bg-overlay-layer { position: absolute; inset: 0; background: var(--overlay-gradient); z-index: 1; pointer-events: none; }

        .container { position: relative; z-index: 10; max-width: 1100px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-title { font-size: 2.8rem; font-weight: 800; margin-bottom: 10px; }
        .highlight { background: linear-gradient(90deg, #ff91f9, #6a00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section-subtitle { color: var(--text-meta); max-width: 500px; margin: 0 auto; }
        .title-accent { width: 50px; height: 4px; background: #ff91f9; margin: 20px auto; border-radius: 10px; }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .project-card {
          background: var(--card-bg);
          border: var(--card-border);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          box-shadow: var(--card-shadow);
          backdrop-filter: blur(10px);
        }

        .project-card:hover { transform: translateY(-10px); border-color: #ff91f9; }

        .image-container { position: relative; height: 220px; overflow: hidden; }
        .project-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
        .project-card:hover .project-img { transform: scale(1.1); }

        .category-tag {
          position: absolute; top: 15px; left: 15px;
          background: rgba(0,0,0,0.6); color: #fff;
          font-size: 0.7rem; padding: 5px 12px; border-radius: 20px;
          backdrop-filter: blur(5px); z-index: 2;
        }

        .image-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: 0.3s; pointer-events: none;
        }
        .project-card:hover .image-overlay { opacity: 1; }
        
        .overlay-btn {
          background: #fff; color: #000; padding: 8px 20px;
          border-radius: 30px; font-weight: 600; display: flex; gap: 8px; align-items: center;
          transform: translateY(10px); transition: 0.3s;
        }
        .project-card:hover .overlay-btn { transform: translateY(0); }

        .card-content { padding: 25px; flex: 1; display: flex; flex-direction: column; }
        .card-meta { display: flex; gap: 15px; font-size: 0.8rem; color: var(--text-meta); margin-bottom: 15px; }
        .meta-info { display: flex; align-items: center; gap: 5px; }

        .card-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; color: var(--text-title); }
        .card-description { font-size: 0.9rem; color: var(--text-body); line-height: 1.6; margin-bottom: 20px; }

        .card-footer {
          margin-top: auto; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; justify-content: space-between; align-items: center;
        }

        .status-pill {
          display: flex; align-items: center; gap: 5px; font-size: 0.75rem;
          color: #34d399; background: rgba(52, 211, 153, 0.1);
          padding: 4px 10px; border-radius: 5px; font-weight: 600;
        }

        .visit-action-btn {
          background: transparent; border: none; color: var(--btn-color);
          font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 5px;
          transition: 0.3s;
        }
        .visit-action-btn:hover { gap: 10px; color: var(--text-title); }

        @media (max-width: 768px) {
          .section-title { font-size: 2rem; }
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
