import React, { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Zap, Users, Layers, Calendar, Linkedin, Twitter, Quote } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg"; 
import { useTheme } from "../context/ThemeContext"; 

// --- DYNAMIC API CONFIGURATION ---
const API_BASE = import.meta.env.VITE_API_BASE; // e.g., https://backend.onrender.com/api
// For images, we need the root URL (without the /api suffix)
const SERVER_URL = API_BASE ? API_BASE.replace('/api', '') : "";

export default function AboutRoutes() {
  const { theme } = useTheme() || { theme: "light" }; 
  const isDark = theme === "dark";
  
  const [teamMembers, setTeamMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);

  const [aboutData, setAboutData] = useState({
    content: {
      sectionTitle: "Who We Are",
      mainHeadline: "About BushTechs Solutions",
      subHeadline: "Safe, comprehensive, and fast platform.",
      description: "BushTechs builds modern, secure, and scalable digital products that empower businesses to move faster.",
    },
    stats: {
      engineers: "0",
      customers: "0",
      projects: "0",
      established: "2025",
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. Fetch General About Info
    fetch(`${API_BASE}/about-info`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) setAboutData(data);
      })
      .catch((err) => console.error("Error fetching about info:", err));

    // 2. Fetch Team Members
    fetch(`${API_BASE}/team`)
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Error fetching team:", err));

    // 3. Fetch Testimonials
    fetch(`${API_BASE}/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)) setTestimonials(data);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));

    // 4. Fetch Partners
    fetch(`${API_BASE}/partners`)
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)) setPartners(data);
      })
      .catch((err) => console.error("Error fetching partners:", err));

  }, []);

  // ✅ CORRECTED IMAGE HELPER
  const getImg = (path) => {
    if (!path) return "https://via.placeholder.com/150?text=No+Image";
    if (path.startsWith("http")) return path;
    
    // Ensure path starts with a slash
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${SERVER_URL}${cleanPath}`;
  };

  // Theme Variables (Unchanged as they work fine)
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f0f2f5", 
    "--text-primary": isDark ? "#ffffff" : "#0f172a",
    "--text-secondary": isDark ? "#94a3b8" : "#475569",
    "--text-muted": isDark ? "#cbd5e1" : "#64748b",
    "--overlay-gradient": isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(10,10,25,0.85) 50%, #05050a 100%)"
      : "linear-gradient(to bottom, #f0f2f5 0%, rgba(255,255,255,0.85) 50%, #f0f2f5 100%)",
    "--bg-image-opacity": isDark ? "0.2" : "0.05",
    "--card-bg": isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
    "--card-border": isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
    "--card-hover-bg": isDark ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
    "--card-hover-shadow": isDark ? "0 15px 35px rgba(0,0,0,0.6)" : "0 15px 35px rgba(0,0,0,0.1)",
    "--stats-bg": isDark ? "#0a0a12" : "#ffffff",
    "--stats-border": isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    "--stats-shadow": isDark ? "0 20px 50px rgba(0, 0, 0, 0.5)" : "0 10px 30px rgba(0, 0, 0, 0.05)",
    "--stats-divider": isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
    "--stat-icon-color": isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    "--orb-ring-color": isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    "--orb-ring-border": isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    "--glass-card-bg": isDark ? "rgba(15, 20, 35, 0.8)" : "rgba(255, 255, 255, 0.8)",
    "--badge-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
    "--badge-icon-bg": isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    "--social-bg": isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    "--social-icon-color": isDark ? "#ffffff" : "#333333",
  };

  return (
    <section className="about-section" aria-label="About BushTechs" style={themeVars}>
      {/* ... (Keep all SVG and background divs exactly as they are in your code) ... */}
      <div className="tech-wave-top">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
                <filter id="glowAbout" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                <linearGradient id="wave-gradient-about" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#00d2ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#6a00ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#ff91f9" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path 
                d="M0,60 C320,140 520,-20 920,60 C1220,140 1340,20 1440,50" 
                stroke="url(#wave-gradient-about)" 
                strokeWidth="3" 
                fill="none"
                filter="url(#glowAbout)"
                className="animated-path"
            />
        </svg>
      </div>

      <div className="bg-image" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="bg-overlay" />
      
      {isDark && (
        <>
          <div className="glow-orb top-right" />
          <div className="glow-orb bottom-left" />
        </>
      )}

      <div className="container">
        
        {/* --- SECTION 1: INTRO --- */}
        <div className="about-grid">
          <div className="content-column">
            <div className="section-tag">{aboutData.content.sectionTitle}</div>
            <h1 className="section-title">{aboutData.content.mainHeadline}</h1>
            <div className="glow-divider"></div>
            <h3 className="sub-headline">{aboutData.content.subHeadline}</h3>
            <p className="description">{aboutData.content.description}</p>

            <div className="badges-row">
              <div className="feature-badge">
                <div className="badge-icon cyan"><ShieldCheck size={20} /></div>
                <div className="badge-text"><strong>Trust</strong><span>Secure & Reliable</span></div>
              </div>
              <div className="feature-badge">
                <div className="badge-icon purple"><Sparkles size={20} /></div>
                <div className="badge-text"><strong>Innovation</strong><span>Creative Solutions</span></div>
              </div>
              <div className="feature-badge">
                <div className="badge-icon pink"><Zap size={20} /></div>
                <div className="badge-text"><strong>Speed</strong><span>High Performance</span></div>
              </div>
            </div>
          </div>

          <div className="visual-column">
            <div className="tech-orb-container">
              <div className="core-sphere"></div>
              <div className="orbit-ring ring-1"></div>
              <div className="orbit-ring ring-2"></div>
              <div className="orbit-ring ring-3"></div>
              <div className="glass-stat-card">
                <div className="status-dot"></div>
                <div>
                  <span className="stat-label-card">System Status</span>
                  <span className="stat-val-card">Optimized</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- STATS BAR --- */}
        <div className="stats-bar">
          <StatItem icon={<Users size={24} />} value={aboutData.stats.engineers} label="Engineers" color="#4ade80" />
          <div className="stat-divider" />
          <StatItem icon={<Users size={24} />} value={aboutData.stats.customers} label="Customers" color="#facc15" />
          <div className="stat-divider" />
          <StatItem icon={<Layers size={24} />} value={aboutData.stats.projects} label="Projects" color="#60a5fa" />
          <div className="stat-divider" />
          <StatItem icon={<Calendar size={24} />} value={aboutData.stats.established} label="Established" color="#f472b6" />
        </div>

        {/* ... (The rest of the rendering logic for Team, Partners, and Testimonials remains the same as your code) ... */}
        {/* Just ensure all image src tags use {getImg(variable)} */}
        
        <div className="spacer-80"></div>

        <div className="centered-header">
            <div className="section-tag">The Minds Behind</div>
            <h2 className="section-subtitle">Our <span className="highlight">Leadership & Team</span></h2>
        </div>

        {teamMembers.length > 0 ? (
          <div className="team-grid">
              {teamMembers.map((m) => (
                  <div key={m.id} className="team-card">
                      <div className="team-img-wrapper">
                          <img src={getImg(m.image)} alt={m.name} className="team-img" />
                          <div className="team-socials">
                            {m.linkedin_url && (
                              <a href={m.linkedin_url} target="_blank" rel="noreferrer" className="social-icon"><Linkedin size={18} /></a>
                            )}
                            {m.twitter_url && (
                              <a href={m.twitter_url} target="_blank" rel="noreferrer" className="social-icon"><Twitter size={18} /></a>
                            )}
                          </div>
                      </div>
                      <div className="team-info">
                          <h4>{m.name}</h4>
                          <p>{m.role}</p>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <p style={{textAlign: 'center', color: themeVars['--text-secondary']}}>No team members added yet.</p>
        )}

        <div className="spacer-80"></div>

        {/* PARTNERS */}
        <div className="centered-header">
            <div className="section-tag">Trusted By</div>
            <h2 className="section-subtitle">Our <span className="highlight">Partners</span></h2>
        </div>

        {partners.length > 0 ? (
          <div className="marquee-container">
              <div className="marquee-track">
                  {partners.map((p, i) => (
                      <div key={i} className="partner-card">
                          <img 
                            src={getImg(p.logo)} 
                            alt={p.name} 
                            style={{ maxWidth: "120px", maxHeight: "80px", objectFit: "contain" }}
                          />
                      </div>
                  ))}
              </div>
          </div>
        ) : (
          <p style={{textAlign: 'center', color: themeVars['--text-secondary']}}>No partners added yet.</p>
        )}
        
      </div>

      <style>{`
        /* ... Keep all your CSS styles here ... */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Orbitron:wght@700;900&display=swap');
        /* ... (rest of your CSS) ... */
      `}</style>
    </section>
  );
}

function StatItem({ icon, value, label, color }) {
  return (
    <div className="stat-item">
      <div className="stat-content">
        <div className="stat-value" style={{ color: color }}>{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div style={{ color: 'var(--stat-icon-color)' }}>{icon}</div>
    </div>
  );
}
