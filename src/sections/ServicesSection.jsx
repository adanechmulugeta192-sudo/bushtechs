import React, { useState } from "react";
import { Globe, Smartphone, Palette, Briefcase, ArrowRight } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg"; 
import { useTheme } from "../context/ThemeContext"; // 1. Import Hook

const SERVICES = [
  {
    id: 1,
    title: "Web Development",
    desc: "We build high-performance, responsive websites and web apps using modern frameworks like React and Next.js.",
    icon: <Globe size={32} />,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Mobile Development",
    desc: "Native and cross-platform mobile applications designed for seamless user experiences on iOS and Android.",
    icon: <Smartphone size={32} />,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Branding",
    desc: "We craft unique visual identities, logos, and design systems that make your business memorable.",
    icon: <Palette size={32} />,
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Consulting",
    desc: "Expert guidance on digital transformation, workflow automation, and scalable technology strategies.",
    icon: <Briefcase size={32} />,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
  },
];

export default function InteractiveServices() {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const activeService = SERVICES.find((s) => s.id === activeId);
  
  // 2. GET THEME
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 3. DEFINE DYNAMIC CSS VARIABLES
  // We inject these into the container so the CSS reads them automatically.
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8f9fa",
    "--text-heading": isDark ? "#ffffff" : "#111827",
    
    // Overlay: Fades the image into the background color
    "--overlay-gradient": isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(5,5,10,0.8) 50%, #05050a 100%)"
      : "linear-gradient(to bottom, #f8f9fa 0%, rgba(255,255,255,0.7) 50%, #f8f9fa 100%)",

    // Cards
    "--card-bg": isDark ? "#12121a" : "#ffffff",
    "--card-title": isDark ? "#ffffff" : "#1a1a2e",
    "--card-desc": isDark ? "#94a3b8" : "#64748b",
    "--card-shadow": isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.1)",
    "--card-border": isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",

    // Icons
    "--icon-box-bg": isDark ? "#1f2937" : "#000000",
    "--icon-box-text": "#ffffff", // Always white looks best for contrast

    // Button
    "--btn-text": isDark ? "#ffffff" : "#1a1a2e",
  };

  return (
    <section className="overlap-section" style={themeVars}>
      
      {/* --- TOP ANIMATED TECH WAVE --- */}
      <div className="tech-wave-container">
        <svg className="tech-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(106, 0, 255, 0)" />
                    <stop offset="50%" stopColor="#ff00d4" />
                    <stop offset="100%" stopColor="rgba(0, 210, 255, 0)" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <path 
                className="wave-path"
                fill="none" 
                stroke="url(#waveGradient)" 
                strokeWidth="4"
                filter="url(#glow)"
                d="M0,60 C320,140 420,0 720,60 C1020,120 1120,0 1440,60" 
            />
        </svg>
        {/* Particles */}
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
      </div>

      {/* --- MAIN SECTION BACKGROUND --- */}
      <div className="section-bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="section-overlay" />

      {/* CONTENT WRAPPER */}
      <div className="content-wrapper">
        
        {/* HEADER */}
        <div className="header-container">
          <h2 className="section-title">Our Services</h2>
          <div className="title-bar"></div>
        </div>

        {/* BANNER */}
        <div className="banner-wrapper">
          <img 
            key={activeService.id} 
            src={activeService.img} 
            alt={activeService.title} 
            className="banner-img animate-fade" 
          />
          
          {/* BANNER OVERLAY */}
          <div className="banner-overlay">
              <div className="banner-text-content">
                  <h3>{activeService.title}</h3>
              </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="cards-container">
          {SERVICES.map((item) => (
            <div 
              key={item.id} 
              className={`service-card ${activeId === item.id ? "active-card" : ""}`}
              onClick={() => setActiveId(item.id)}
            >
              <div className="icon-box">
                {item.icon}
              </div>

              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.desc}</p>

              <div className="more-btn">
                {activeId === item.id ? "ACTIVE" : "MORE"} 
                <ArrowRight size={16} className="arrow-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .overlap-section {
          position: relative;
          padding-bottom: 100px;
          padding-top: 80px; 
          margin-top: -5px;
          font-family: 'Inter', sans-serif;
          
          /* --- APPLIED THEME VARS --- */
          background-color: var(--bg-color); 
          transition: background-color 0.3s ease;
          overflow: hidden;
        }

        /* --- TECH WAVE STYLES --- */
        .tech-wave-container {
            position: absolute;
            top: -20px;
            left: 0;
            width: 100%;
            height: 120px;
            z-index: 10;
            pointer-events: none;
        }
        
        .tech-wave { width: 100%; height: 100%; }

        .wave-path {
            stroke-dasharray: 1440;
            stroke-dashoffset: 1440;
            animation: drawWave 4s ease-out forwards, pulseWave 3s infinite alternate;
        }

        .particle {
            position: absolute;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px #fff, 0 0 20px #ff00d4;
            opacity: 0;
            animation: floatUp 4s infinite;
        }
        .p1 { width: 4px; height: 4px; left: 20%; top: 60%; animation-delay: 0s; }
        .p2 { width: 6px; height: 6px; left: 50%; top: 40%; animation-delay: 1.5s; background: #00d2ff; box-shadow: 0 0 10px #00d2ff; }
        .p3 { width: 3px; height: 3px; left: 80%; top: 70%; animation-delay: 3s; }

        @keyframes drawWave { to { stroke-dashoffset: 0; } }
        @keyframes pulseWave {
            0% { stroke-width: 3; filter: drop-shadow(0 0 2px #ff00d4); }
            100% { stroke-width: 5; filter: drop-shadow(0 0 8px #00d2ff); }
        }
        @keyframes floatUp {
            0% { transform: translateY(0) scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
        }

        /* --- BACKGROUNDS --- */
        .section-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          opacity: 0.15; 
          filter: grayscale(100%); 
        }

        .section-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-gradient); /* Dynamic Gradient */
          z-index: 1;
          transition: background 0.3s ease;
        }

        .content-wrapper { position: relative; z-index: 2; }

        /* HEADER */
        .header-container { text-align: center; margin-bottom: 30px; }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-heading); /* Dynamic Color */
          margin-bottom: 10px;
          transition: color 0.3s;
        }
        .title-bar {
            width: 60px;
            height: 4px;
            background: #ff91f9;
            margin: 0 auto;
            border-radius: 2px;
        }

        /* BANNER AREA */
        .banner-wrapper {
          position: relative;
          width: 100%;
          height: 450px; 
          overflow: hidden;
          background: #111;
        }

        .banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.9) contrast(1.1);
        }

        .animate-fade {
          animation: zoomFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes zoomFade {
          0% { opacity: 0; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* BANNER OVERLAY */
        /* Kept dark for text contrast, but bottom fades to Theme Color */
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(to bottom, rgba(5,5,10,0.1) 0%, rgba(5,5,10,0.6) 90%, var(--bg-color) 100%),
            radial-gradient(circle at top right, rgba(255, 145, 249, 0.15), transparent 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(1px); 
        }
        
        .banner-text-content h3 {
            color: rgba(255, 255, 255, 0.9);
            font-size: 5rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 10px;
            user-select: none;
            mix-blend-mode: overlay;
            opacity: 0.8;
            text-align: center;
            padding: 0 20px;
        }

        /* CARDS CONTAINER */
        .cards-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
          padding: 0 20px;
          margin-top: -120px; 
          z-index: 10;
        }

        /* SERVICE CARD */
        .service-card {
          background: var(--card-bg);
          border: var(--card-border);
          border-radius: 16px;
          padding: 40px 25px;
          text-align: center;
          box-shadow: var(--card-shadow);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-bottom: 4px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .service-card:hover {
          transform: translateY(-10px);
        }

        .active-card {
          border-bottom-color: #ff91f9;
          transform: translateY(-15px);
          box-shadow: 0 25px 50px -12px rgba(255, 145, 249, 0.25); 
        }

        .icon-box {
          background: var(--icon-box-bg);
          color: var(--icon-box-text);
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          margin-top: -10px;
          transition: 0.3s;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .active-card .icon-box {
            background: #ff91f9; 
            color: #fff;
        }

        .card-title {
          color: var(--card-title);
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .card-desc {
          color: var(--card-desc);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .more-btn {
          margin-top: auto;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--btn-text);
          transition: color 0.3s;
        }
        
        .active-card .more-btn {
            color: #ff91f9;
        }

        @media (max-width: 768px) {
          .banner-wrapper { height: 300px; }
          .cards-container {
            margin-top: -50px;
            gap: 20px;
          }
          .banner-text-content h3 { font-size: 3rem; letter-spacing: 5px; }
        }
      `}</style>
    </section>
  );
}