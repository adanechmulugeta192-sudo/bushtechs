import React from "react";
import { MapPin, CheckCircle2, ArrowUpRight, ExternalLink, Calendar } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg";
import projectImg1 from "../assets/1project-1.jpg";
import { useTheme } from "../context/ThemeContext"; // 1. Import Hook

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
    link: "https://hopeenergy-emw.com/"
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
    link: "https://kumacon-frontend.vercel.app/" 
  }
];

export default function Projects() {
  const { theme } = useTheme(); // 2. Get Theme
  const isDark = theme === "dark";

  const openProject = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank");
    }
  };

  // 3. DEFINE DYNAMIC VARIABLES
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8f9fa",
    "--text-title": isDark ? "#ffffff" : "#111827",
    "--text-body": isDark ? "#cbd5e1" : "#475569",
    "--text-meta": isDark ? "#94a3b8" : "#64748b",
    
    // Card Styles
    "--card-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
    "--card-border": isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.1)",
    "--card-shadow": isDark ? "none" : "0 10px 30px rgba(0,0,0,0.05)",
    "--card-hover-shadow": isDark ? "0 25px 50px -12px rgba(0, 0, 0, 0.6)" : "0 20px 40px -10px rgba(0, 0, 0, 0.1)",

    // Background Overlay (Dark Fade vs White Fade)
    "--overlay-gradient": isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(10,10,20,0.85) 30%, #05050a 100%)"
      : "linear-gradient(to bottom, #f8f9fa 0%, rgba(255,255,255,0.85) 30%, #f8f9fa 100%)",
    
    // Badge & Buttons
    "--badge-bg": isDark ? "rgba(5, 5, 10, 0.85)" : "rgba(255, 255, 255, 0.9)",
    "--badge-text": isDark ? "#ff91f9" : "#d946ef",
    "--btn-text": isDark ? "#ff91f9" : "#d946ef",
    "--btn-text-hover": isDark ? "#ffffff" : "#000000",
  };

  return (
    <section className="projects-section" id="projects" style={themeVars}>
      
      {/* --- TOP TECH WAVE ANIMATION --- */}
      <div className="tech-wave-top">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
                <filter id="glowProj" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <linearGradient id="wave-gradient-proj" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#6a00ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#ff91f9" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path 
                d="M0,50 C320,120 520,-40 920,50 C1220,120 1340,20 1440,40" 
                stroke="url(#wave-gradient-proj)" 
                strokeWidth="3" 
                fill="none"
                filter="url(#glowProj)"
                className="animated-path"
            />
        </svg>
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
      </div>

      {/* --- BACKGROUND LAYERS --- */}
      <div className="bg-image" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="bg-overlay" />
      
      <div className="container">
        
        {/* --- HEADER --- */}
        <div className="section-header">
          <h2 className="section-title">Our <span className="highlight">Success Stories</span></h2>
          <p className="section-subtitle">
            Delivering digital excellence for industry leaders in Energy and Construction.
          </p>
          <div className="title-bar"></div>
        </div>

        {/* --- PROJECT GRID --- */}
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <article 
              key={index} 
              className="project-card group"
              onClick={() => openProject(project.link)}
            >
              {/* Image Wrapper */}
              <div className="image-wrapper">
                <img src={project.img} alt={project.title} className="project-img" />
                
                <div className="category-badge">
                    {project.category}
                </div>

                <div className="hover-overlay">
                   <span className="view-btn">
                      View Project <ExternalLink size={16} />
                   </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="card-body">
                <div className="meta-row">
                  <span className="meta-item">
                    <MapPin size={14} className="meta-icon" /> {project.location}
                  </span>
                  <span className="meta-item">
                    <Calendar size={14} className="meta-icon" /> {project.year}
                  </span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="footer-row">
                    <span className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}>
                        <CheckCircle2 size={14} /> {project.status}
                    </span>
                    
                    <button className="link-btn">
                        Visit Site <ArrowUpRight size={18} />
                    </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* --- CSS STYLES --- */}
      <style>{`
        /* SECTION BASE */
        .projects-section {
          position: relative;
          padding: 80px 20px 100px 20px; 
          margin-top: -20px; 
          
          /* Apply Theme Variables */
          background-color: var(--bg-color);
          color: var(--text-title);
          transition: background-color 0.3s ease, color 0.3s ease;
          
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* --- TOP WAVE STYLES --- */
        .tech-wave-top {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 120px;
            z-index: 10;
            pointer-events: none;
            overflow: hidden;
        }
        .tech-wave-top svg { width: 100%; height: 100%; transform: scaleX(1.1); }
        .animated-path {
            stroke-dasharray: 1440;
            stroke-dashoffset: 1440;
            animation: drawLine 4s ease-out forwards;
        }

        .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #ff91f9;
            border-radius: 50%;
            box-shadow: 0 0 10px #ff91f9;
            animation: floatParticle 6s infinite ease-in-out;
            opacity: 0;
        }
        .p1 { top: 30%; left: 20%; animation-delay: 0s; background: #00d2ff; }
        .p2 { top: 60%; left: 50%; animation-delay: 2s; background: #ff91f9; }
        .p3 { top: 40%; left: 80%; animation-delay: 4s; background: #6a00ff; }

        @keyframes drawLine { to { stroke-dashoffset: 0; } }
        @keyframes floatParticle {
            0% { transform: translateY(0) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-50px) scale(1); opacity: 0; }
        }

        /* --- BACKGROUND --- */
        .bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          opacity: 0.15; /* Lower opacity for light mode compatibility */
          filter: grayscale(30%);
        }
        
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-gradient); /* Dynamic Overlay */
          z-index: 1;
          transition: background 0.3s ease;
        }

        .container {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header { text-align: center; margin-bottom: 50px; }
        
        .section-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 12px;
          color: var(--text-title);
          letter-spacing: -1px;
          transition: color 0.3s;
        }
        
        .highlight {
          background: linear-gradient(90deg, #ff91f9, #6a00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-subtitle {
          color: var(--text-meta);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 20px auto;
          line-height: 1.6;
          transition: color 0.3s;
        }
        
        .title-bar {
          width: 60px;
          height: 4px;
          background: #ff91f9;
          margin: 0 auto;
          border-radius: 2px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 40px;
          justify-content: center;
          max-width: 900px; 
          margin: 0 auto;
        }

        /* --- PROJECT CARD --- */
        .project-card {
          background: var(--card-bg);
          border: var(--card-border);
          box-shadow: var(--card-shadow);
          
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
          position: relative;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 145, 249, 0.4);
          box-shadow: var(--card-hover-shadow);
        }

        .image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .project-card:hover .project-img {
          transform: scale(1.08);
        }
        
        .category-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: var(--badge-bg);
          color: var(--badge-text);
          font-size: 0.7rem;
          padding: 6px 12px;
          border-radius: 30px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid rgba(255, 145, 249, 0.2);
          backdrop-filter: blur(4px);
        }

        .hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 5, 20, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-card:hover .hover-overlay { opacity: 1; }
        
        .view-btn {
          color: #fff;
          font-weight: 600;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          padding: 10px 24px;
          border-radius: 30px;
          display: flex;
          gap: 8px;
          align-items: center;
          transform: translateY(15px);
          transition: transform 0.3s ease, background 0.3s;
        }
        .view-btn:hover {
            background: #ff91f9;
            border-color: #ff91f9;
            color: black;
        }
        .project-card:hover .view-btn { transform: translateY(0); }

        .card-body {
          padding: 30px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .meta-row {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          font-size: 0.85rem;
          color: var(--text-meta);
        }
        .meta-item { display: flex; align-items: center; gap: 6px; }
        .meta-icon { color: #ff91f9; }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-title);
          line-height: 1.3;
        }

        .project-desc {
          font-size: 0.95rem;
          color: var(--text-body);
          line-height: 1.6;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .footer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.1); /* Kept subtle */
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          padding: 5px 12px;
          border-radius: 6px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .status-badge.completed {
          background: rgba(16, 185, 129, 0.1);
          color: #34d399; 
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .link-btn {
          background: transparent;
          border: none;
          color: var(--btn-text);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: 0.3s;
          padding: 0;
        }
        .project-card:hover .link-btn {
          color: var(--btn-text-hover);
          gap: 10px;
        }
        
        /* Link button specific color logic in light mode */
        .project-card:hover .link-btn {
           color: var(--text-title);
        }

        @media (max-width: 768px) {
          .section-title { font-size: 2.2rem; }
          .projects-section { padding: 60px 15px 80px 15px; }
          .projects-grid { grid-template-columns: 1fr; }
          .image-wrapper { height: 200px; }
        }
      `}</style>
    </section>
  );
}