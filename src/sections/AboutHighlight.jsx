import React from "react";
import { Globe, Smartphone, Palette, Briefcase, Users, Layers, Calendar } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg";
import { useTheme } from "../context/ThemeContext"; 

const features = [
  {
    icon: <Globe size={32} strokeWidth={1.5} />,
    title: "Web Development",
    desc: "High-performance websites using React & Next.js.",
  },
  {
    icon: <Smartphone size={32} strokeWidth={1.5} />,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile solutions.",
  },
  {
    icon: <Palette size={32} strokeWidth={1.5} />,
    title: "Branding",
    desc: "Unique visual identities and design systems.",
  },
  {
    icon: <Briefcase size={32} strokeWidth={1.5} />,
    title: "Consulting",
    desc: "Digital transformation and tech strategies.",
  },
];

const stats = [
  { value: "5+", label: "Engineers", icon: <Users size={24} />, color: "#4ade80" },
  { value: "15+", label: "Customers", icon: <Users size={24} />, color: "#facc15" },
  { value: "15+", label: "Projects", icon: <Layers size={24} />, color: "#60a5fa" },
  { value: "2025", label: "Established", icon: <Calendar size={24} />, color: "#f472b6" }
];

export default function AboutHighlight() {
  const { theme } = useTheme(); 
  const isDark = theme === "dark";

  // --- THEME STYLES ---
  const themeStyles = {
    sectionBg: isDark ? "#05050a" : "#ffffff",
    textColor: isDark ? "#ffffff" : "#111827",
    descColor: isDark ? "#cbd5e1" : "#4b5563",
    overlay: isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(15, 23, 42, 0.95) 30%, rgba(15, 23, 42, 0.98) 100%)"
      : "linear-gradient(to bottom, #ffffff 10%, rgba(255, 255, 255, 0.9) 40%, #ffffff 100%)",
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    cardBorder: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)",
    cardTitle: isDark ? "#ffffff" : "#1f2937",
    cardDesc: isDark ? "#94a3b8" : "#64748b",
    featureIcon: isDark ? "#ff91f9" : "#7c3aed",
    statsBg: isDark ? "#0a0a12" : "#ffffff",
    statsBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    statsShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 10px 40px rgba(0,0,0,0.1)",
    statsLabel: isDark ? "#9ca3af" : "#4b5563",
    statsIcon: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    statsDivider: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
    highlightGradient: isDark 
      ? "linear-gradient(90deg, #ffffff, #a5f3fc)" 
      : "linear-gradient(90deg, #1e3a8a, #7c3aed)", 
    highlightFilter: isDark 
      ? "drop-shadow(0 0 8px rgba(0, 210, 255, 0.5))" 
      : "none", 
  };

  return (
    <section 
      className="about-section" 
      style={{ 
        backgroundColor: themeStyles.sectionBg, 
        color: themeStyles.textColor, 
        transition: "background-color 0.3s ease, color 0.3s ease" 
      }}
    >
      
      {/* Wave Animation */}
      <div className="tech-wave-top">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <linearGradient id="wave-gradient" x1="0" y1="0" x2="100%" y2="0"><stop offset="0%" stopColor="#6a00ff" stopOpacity="0" /><stop offset="50%" stopColor="#ff91f9" stopOpacity="1" /><stop offset="100%" stopColor="#00d2ff" stopOpacity="0" /></linearGradient>
            </defs>
            <path d="M0,50 C320,120 520,-40 920,50 C1220,120 1340,20 1440,40" stroke="url(#wave-gradient)" strokeWidth="3" fill="none" filter="url(#glow)" className="animated-path" />
        </svg>
      </div>

      <div className="about-bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="about-overlay" style={{ background: themeStyles.overlay }} />

      <div className="about-container">
        
        {/* Main Content */}
        <div className="split-layout">
          
          {/* Text Area */}
          <div className="left-content">
            <div className="title-wrapper">
              <h2 className="main-title" style={{ color: themeStyles.textColor }}>
                About <br /> 
                <span 
                  className="tech-font-highlight" 
                  style={{ 
                    background: themeStyles.highlightGradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: themeStyles.highlightFilter
                  }}
                >
                  BushTechs Solutions
                </span>
              </h2>
            </div>
            <p className="main-desc" style={{ color: themeStyles.descColor }}>
              BushTechs is a modern technology Solutions delivering innovative, scalable, and user-focused digital solutions. 
              We specialize in helping businesses navigate the complexities of the digital world through creativity, precision, and futuristic engineering.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="right-content">
            <div className="feature-grid">
              {features.map((item, i) => (
                <div 
                  key={i} 
                  className="feature-item"
                  style={{ 
                    backgroundColor: themeStyles.cardBg, 
                    borderColor: themeStyles.cardBorder 
                  }}
                >
                  <div className="feature-icon" style={{ color: themeStyles.featureIcon }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ color: themeStyles.cardTitle }}>{item.title}</h3>
                    <p style={{ color: themeStyles.cardDesc }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div 
          className="stats-bar" 
          style={{ 
            backgroundColor: themeStyles.statsBg, 
            borderColor: themeStyles.statsBorder,
            boxShadow: themeStyles.statsShadow
          }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-content">
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label" style={{ color: themeStyles.statsLabel }}>
                  {stat.label}
                </div>
              </div>
              <div className="stat-icon" style={{ color: themeStyles.statsIcon }}>
                {stat.icon}
              </div>
              {index !== stats.length - 1 && (
                <div className="stat-divider" style={{ background: `linear-gradient(to bottom, transparent, ${themeStyles.statsDivider}, transparent)` }} />
              )}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;600&display=swap');

        /* BASE STYLES */
        .about-section {
          position: relative;
          padding: 100px 20px 80px 20px; 
          margin-top: -50px; 
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* WAVE ANIMATION */
        .tech-wave-top { position: absolute; top: 0; left: 0; width: 100%; height: 120px; z-index: 10; pointer-events: none; overflow: hidden; }
        .tech-wave-top svg { width: 100%; height: 100%; transform: scaleX(1.1); }
        .animated-path { stroke-dasharray: 1440; stroke-dashoffset: 1440; animation: drawLine 4s ease-out forwards; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }

        /* BACKGROUNDS */
        .about-bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; opacity: 0.4; }
        .about-overlay { position: absolute; inset: 0; z-index: 1; }
        .about-container { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; width: 100%; }

        /* LAYOUT GRID */
        .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 50px; }
        .left-content { padding-right: 20px; }
        
        /* TYPOGRAPHY */
        .title-wrapper { border-left: 6px solid #ff91f9; padding-left: 30px; margin-bottom: 25px; }
        .main-title { font-size: clamp(2.5rem, 5vw, 3rem); font-weight: 800; line-height: 1.2; margin: 0; }
        .tech-font-highlight { font-family: 'Orbitron', sans-serif; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; display: block; margin-top: 5px; }
        .main-desc { font-size: 1.05rem; line-height: 1.7; max-width: 95%; }

        /* FEATURE CARDS */
        .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .feature-item { padding: 20px; border-radius: 12px; transition: 0.3s; border: 1px solid transparent; }
        .feature-item:hover { transform: translateY(-5px); }
        .feature-icon { margin-bottom: 10px; }
        .feature-item h3 { font-size: 1rem; font-weight: 700; margin-bottom: 5px; }
        .feature-item p { font-size: 0.85rem; line-height: 1.4; margin: 0; }

        /* STATS BAR */
        .stats-bar { display: flex; justify-content: space-between; align-items: center; border: 1px solid transparent; border-radius: 20px; padding: 40px 50px; position: relative; overflow: hidden; transition: 0.3s; }
        .stat-item { display: flex; align-items: center; gap: 20px; position: relative; flex: 1; justify-content: center; }
        .stat-value { font-size: clamp(2rem, 4vw, 3rem); font-weight: 900; line-height: 1; margin-bottom: 5px; font-family: 'Orbitron', sans-serif; }
        .stat-label { font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
        .stat-icon { transition: 0.3s; }
        .stat-item:hover .stat-icon { transform: scale(1.1); }
        .stat-divider { position: absolute; right: 0; top: 10%; height: 80%; width: 1px; }

        /* =========================================
           RESPONSIVE MEDIA QUERIES
        ========================================= */

        /* TABLET & SMALL LAPTOP (Max Width 1024px) */
        @media (max-width: 1024px) {
           .split-layout { gap: 40px; }
           .stats-bar { padding: 30px; }
        }

        /* MOBILE & TABLET PORTRAIT (Max Width 900px) */
        @media (max-width: 900px) {
          .about-section { padding-top: 80px; margin-top: 0; }
          
          /* Stack Main Layout */
          .split-layout { grid-template-columns: 1fr; gap: 40px; }
          .left-content { padding-right: 0; text-align: center; }
          .title-wrapper { border-left: none; padding-left: 0; border-bottom: 4px solid #ff91f9; padding-bottom: 20px; display: inline-block; }
          .main-desc { margin: 0 auto; }
          
          /* Stack Feature Grid */
          .feature-grid { grid-template-columns: 1fr 1fr; } 
          
          /* Wrap Stats */
          .stats-bar { flex-wrap: wrap; gap: 30px; justify-content: center; }
          .stat-item { flex: 1 1 40%; justify-content: center; }
          .stat-divider { display: none; }
          
          .tech-wave-top svg { transform: scaleX(2); }
        }
        
        /* SMALL MOBILE (Max Width 600px) */
        @media (max-width: 600px) {
            .feature-grid { grid-template-columns: 1fr; } /* 1 Column Grid */
            
            .stats-bar { flex-direction: column; align-items: center; width: 100%; padding: 30px 20px; box-sizing: border-box; }
            .stat-item { width: 100%; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px; justify-content: space-between; }
            .stat-item:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
            
            .main-title { font-size: 2.2rem; }
        }
      `}</style>
    </section>
  );
}