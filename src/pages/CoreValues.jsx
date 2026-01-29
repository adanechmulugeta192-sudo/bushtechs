import React from "react";
import { Lightbulb, Handshake, ShieldCheck, Users, TrendingUp, BookOpen } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg";
import { useTheme } from "../context/ThemeContext"; // 1. Import Hook

const VALUES = [
  { 
    icon: <Lightbulb size={32} />, 
    title: "Innovation", 
    desc: "Pioneering creative solutions for the future.",
    color: "#00d2ff" // Cyan
  },
  { 
    icon: <Handshake size={32} />, 
    title: "Integrity", 
    desc: "Transparency and honesty in every interaction.",
    color: "#ff91f9" // Pink
  },
  { 
    icon: <ShieldCheck size={32} />, 
    title: "Quality", 
    desc: "Excellence delivered with absolute precision.",
    color: "#6a00ff" // Purple
  },
  { 
    icon: <Users size={32} />, 
    title: "Customer", 
    desc: "Building trust-driven, lasting partnerships.",
    color: "#00ff9d" // Neon Green
  },
  { 
    icon: <TrendingUp size={32} />, 
    title: "Growth", 
    desc: "Constant evolution and improvement.",
    color: "#ffcc00" // Yellow
  },
  { 
    icon: <BookOpen size={32} />, 
    title: "Learning", 
    desc: "Investing in knowledge and future expertise.",
    color: "#ff0055" // Red/Pink
  },
];

export default function CoreValues() {
  const { theme } = useTheme(); // 2. Get Theme
  const isDark = theme === "dark";

  // 3. DEFINE DYNAMIC THEME VARIABLES
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8f9fa",
    "--text-title": isDark ? "#ffffff" : "#111827",
    "--text-desc": isDark ? "#9ca3af" : "#4b5563",

    // Cards
    "--card-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
    "--card-border": isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
    "--card-hover-bg": isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
    "--card-shadow": isDark ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
    "--card-hover-shadow": isDark 
      ? "0 20px 40px -10px rgba(0,0,0,0.6)" 
      : "0 15px 30px -5px rgba(0,0,0,0.1)",

    // Icons
    "--icon-bg": isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6",
    "--icon-border": isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    "--icon-color": isDark ? "#aaaaaa" : "#64748b",
    
    // Overlay
    "--overlay-gradient": isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(10,10,25,0.9) 50%, #05050a 100%)"
      : "linear-gradient(to bottom, #f8f9fa 0%, rgba(255,255,255,0.8) 50%, #f8f9fa 100%)",
    "--bg-opacity": isDark ? "0.15" : "0.05"
  };

  return (
    <section className="values-section" style={themeVars}>
      
      {/* Background Texture */}
      <div className="bg-image" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="bg-overlay" />

      <div className="container">
        
        {/* Header */}
        <div className="header-wrapper">
          <h2 className="section-title">Our Core Values</h2>
          <div className="title-bar"></div>
        </div>

        {/* THE MONOLITH GRID */}
        <div className="monolith-grid">
          {VALUES.map((val, index) => (
            <div key={index} className="monolith-card" style={{ "--accent": val.color }}>
              
              {/* Top Accent Line */}
              <div className="top-line"></div>

              {/* Icon */}
              <div className="icon-box">
                {val.icon}
              </div>

              {/* Text Content */}
              <h3 className="value-title">{val.title}</h3>
              <p className="value-desc">{val.desc}</p>

              {/* Hover Glow Effect */}
              <div className="hover-glow" />
            </div>
          ))}
        </div>

      </div>

      <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Montserrat:wght@400;600&display=swap');

        .values-section {
          position: relative;
          padding: 100px 20px;
          
          /* Dynamic Theme Colors */
          background-color: var(--bg-color);
          transition: background-color 0.3s ease;
          
          overflow: hidden;
          font-family: 'Montserrat', sans-serif;
        }

        /* Backgrounds */
        .bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          opacity: var(--bg-opacity);
          filter: grayscale(100%);
        }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-gradient);
          z-index: 1;
          transition: background 0.3s ease;
        }

        .container {
          position: relative;
          z-index: 2;
          max-width: 1300px;
          margin: 0 auto;
        }

        /* Typography */
        .header-wrapper { text-align: center; margin-bottom: 60px; }
        
        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 2.8rem;
          color: var(--text-title);
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: color 0.3s ease;
        }

        .title-bar {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #00d2ff, #ff91f9);
          margin: 0 auto;
          border-radius: 2px;
          box-shadow: 0 0 15px rgba(0, 210, 255, 0.5);
        }

        /* --- THE MONOLITH GRID --- */
        .monolith-grid {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap; 
        }

        /* --- CARD DESIGN --- */
        .monolith-card {
          position: relative;
          flex: 1;
          min-width: 180px;
          
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: var(--card-shadow);
          
          border-radius: 12px;
          padding: 40px 20px;
          text-align: center;
          
          /* Glass Effect */
          backdrop-filter: blur(10px);
          
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                      box-shadow 0.4s ease,
                      border-color 0.4s ease,
                      background 0.3s ease;
          overflow: hidden;
        }

        /* Hover State */
        .monolith-card:hover {
          transform: translateY(-15px);
          background: var(--card-hover-bg);
          border-color: var(--accent);
          box-shadow: var(--card-hover-shadow);
        }

        /* Top Line Accent */
        .top-line {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
          transform-origin: center;
          box-shadow: 0 0 10px var(--accent);
        }
        .monolith-card:hover .top-line {
          transform: scaleX(1);
        }

        /* Icon */
        .icon-box {
          width: 70px;
          height: 70px;
          margin: 0 auto 25px auto;
          border-radius: 50%;
          
          background: var(--icon-bg);
          border: 1px solid var(--icon-border);
          color: var(--icon-color);
          
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.4s ease;
        }
        
        .monolith-card:hover .icon-box {
          background: var(--accent);
          color: #000; /* Icon becomes black when hovered */
          transform: rotateY(180deg);
          box-shadow: 0 0 30px var(--accent);
          border-color: transparent;
        }

        /* Text */
        .value-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.1rem;
          color: var(--text-title);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: color 0.3s;
        }
        /* When hovered, title matches accent color */
        .monolith-card:hover .value-title {
          color: var(--accent);
        }

        .value-desc {
          font-size: 0.85rem;
          color: var(--text-desc);
          line-height: 1.6;
          margin: 0;
          transition: color 0.3s;
        }

        /* Glow Effect Background */
        .hover-glow {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          background: var(--accent);
          filter: blur(60px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .monolith-card:hover .hover-glow {
          opacity: 0.3;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 1024px) {
          .monolith-grid {
            justify-content: center;
          }
          .monolith-card {
            flex: 0 0 45%; /* 2 per row */
            margin-bottom: 20px;
          }
        }

        @media (max-width: 600px) {
          .monolith-card {
            flex: 0 0 100%; /* Stack on mobile */
          }
          .section-title { font-size: 2.2rem; }
        }
      `}</style>
    </section>
  );
}