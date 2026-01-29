import React, { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Zap, Users, Layers, Calendar, Linkedin, Twitter, Quote } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg"; 
import { useTheme } from "../context/ThemeContext"; 

// API CONFIG
const API_BASE = "http://localhost:5000";

export default function AboutRoutes() {
  const { theme } = useTheme() || { theme: "light" }; 
  const isDark = theme === "dark";
  
  // STATE FOR DYNAMIC DATA
  const [teamMembers, setTeamMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);

  // ✅ NEW: State for About Info & Stats
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

    // ✅ 1. Fetch General About Info (Text + Stats)
    fetch(`${API_BASE}/api/about-info`)
      .then((res) => res.json())
      .then((data) => {
        // Only update if data exists
        if (data && data.content) {
          setAboutData(data);
        }
      })
      .catch((err) => console.error("Error fetching about info:", err));

    // 2. Fetch Team Members
    fetch(`${API_BASE}/api/team`)
      .then((res) => res.json())
      .then((data) => setTeamMembers(data))
      .catch((err) => console.error("Error fetching team:", err));

    // 3. Fetch Testimonials
    fetch(`${API_BASE}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)) setTestimonials(data);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));

    // 4. Fetch Partners
    fetch(`${API_BASE}/api/partners`)
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)) setPartners(data);
      })
      .catch((err) => console.error("Error fetching partners:", err));

  }, []);

  // Helper to get image URL
  const getImg = (path) => {
    if (!path) return "https://via.placeholder.com/150?text=No+Image";
    if (path.startsWith("http")) return path;
    return `${API_BASE}${path}`;
  };

  // Theme Variables
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
        
        {/* --- SECTION 1: INTRO (Now Dynamic!) --- */}
        <div className="about-grid">
          <div className="content-column">
            {/* ✅ DYNAMIC: Section Title */}
            <div className="section-tag">{aboutData.content.sectionTitle}</div>
            
            {/* ✅ DYNAMIC: Main Headline */}
            <h1 className="section-title">
              {aboutData.content.mainHeadline} 
              {/* Optional: Add highlighting logic if needed, currently plain text */}
            </h1>
            
            <div className="glow-divider"></div>
            
            {/* ✅ DYNAMIC: Sub Headline */}
            <h3 className="sub-headline">{aboutData.content.subHeadline}</h3>
            
            {/* ✅ DYNAMIC: Description */}
            <p className="description">
              {aboutData.content.description}
            </p>

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
              <div className="data-point p1"></div>
              <div className="data-point p2"></div>
              <div className="data-point p3"></div>
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

        {/* --- STATS BAR (Now Dynamic!) --- */}
        <div className="stats-bar">
          <StatItem icon={<Users size={24} />} value={aboutData.stats.engineers} label="Engineers" color="#4ade80" />
          <div className="stat-divider" />
          <StatItem icon={<Users size={24} />} value={aboutData.stats.customers} label="Customers" color="#facc15" />
          <div className="stat-divider" />
          <StatItem icon={<Layers size={24} />} value={aboutData.stats.projects} label="Projects" color="#60a5fa" />
          <div className="stat-divider" />
          <StatItem icon={<Calendar size={24} />} value={aboutData.stats.established} label="Established" color="#f472b6" />
        </div>

        <div className="spacer-80"></div>

        {/* --- SECTION 2: TEAM --- */}
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

        {/* --- SECTION 3: PARTNERS --- */}
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
                            className="partner-logo"
                            style={{ maxWidth: "120px", maxHeight: "80px", objectFit: "contain" }}
                          />
                      </div>
                  ))}
              </div>
          </div>
        ) : (
          <p style={{textAlign: 'center', color: themeVars['--text-secondary']}}>No partners added yet.</p>
        )}

        <div className="spacer-80"></div>

       {/* --- SECTION 4: TESTIMONIALS --- */}
        <div className="centered-header">
            <div className="section-tag">Success Stories</div>
            <h2 className="section-subtitle">Client <span className="highlight">Testimonials</span></h2>
        </div>

        {testimonials.length > 0 ? (
          <div className="testimonial-marquee-container">
              <div 
                className="testimonial-track"
                style={{
                    animation: "scroll 35s linear infinite", 
                    display: "flex",
                    gap: "40px",
                    width: "max-content"
                }}
              >
                  {testimonials.map((t, i) => (
                      <div key={i} className="testimonial-card-scroll">
                          <Quote size={28} className="quote-icon" />
                          <p className="testimonial-text">"{t.text}"</p>
                          <div className="testimonial-author">
                              <div className="author-avatar">
                                {t.image ? (
                                  <img 
                                    src={getImg(t.image)} 
                                    alt="avatar" 
                                    style={{width: '100%', height:'100%', borderRadius: '50%', objectFit: 'cover'}}
                                  />
                                ) : (
                                  t.author.charAt(0)
                                )}
                              </div>
                              <div>
                                  <strong>{t.author}</strong>
                                  <span>{t.company}</span>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        ) : (
           <p style={{textAlign: 'center', color: themeVars['--text-secondary']}}>No testimonials yet.</p>
        )}
      </div>

      {/* --- STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Orbitron:wght@700;900&display=swap');

        .about-section {
          position: relative;
          padding: 100px 20px 120px 20px;
          margin-top: -40px;
          background-color: var(--bg-color);
          color: var(--text-primary);
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .bg-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          z-index: 0;
          opacity: var(--bg-image-opacity);
          filter: grayscale(100%);
        }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: var(--overlay-gradient);
          z-index: 1;
          transition: background 0.3s ease;
        }

        .glow-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          z-index: 0;
        }
        .top-right { top: -200px; right: -200px; background: #6a00ff; }
        .bottom-left { bottom: -200px; left: -200px; background: #00d2ff; }

        .tech-wave-top { position: absolute; top: 0; left: 0; width: 100%; height: 120px; z-index: 10; pointer-events: none; overflow: hidden; }
        .tech-wave-top svg { width: 100%; height: 100%; transform: scaleX(1.1); }
        .animated-path { stroke-dasharray: 1440; stroke-dashoffset: 1440; animation: drawLine 4s ease-out forwards; }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }

        .container { position: relative; z-index: 2; max-width: 1250px; margin: 0 auto; }

        .section-tag { font-family: 'Orbitron', sans-serif; color: #ff91f9; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; display: inline-block; }
        .section-title { font-family: 'Orbitron', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin: 0; color: var(--text-primary); }
        .section-subtitle { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; font-weight: 700; color: var(--text-primary); margin-bottom: 40px; }
        
        .highlight { background: linear-gradient(90deg, #ff91f9, #6a00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        .centered-header { text-align: center; margin-bottom: 20px; }
        .glow-divider { height: 4px; width: 80px; margin: 20px 0 30px 0; background: linear-gradient(90deg, #6a00ff, #ff91f9); border-radius: 4px; box-shadow: 0 0 15px rgba(106, 0, 255, 0.5); }
        
        .sub-headline { font-size: 1.5rem; font-weight: 600; color: var(--text-muted); margin-bottom: 20px; }
        .text-gradient { color: #00d2ff; font-weight: 700; }
        .description { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.8; max-width: 600px; margin-bottom: 40px; }
        .spacer-80 { height: 80px; width: 100%; }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }
        .badges-row { display: flex; flex-direction: column; gap: 20px; }
        
        .feature-badge { 
            display: flex; align-items: center; gap: 15px; 
            background: var(--badge-bg); 
            border: 1px solid var(--card-border); 
            padding: 15px; border-radius: 16px; 
            transition: transform 0.3s, background 0.3s; 
            width: fit-content; min-width: 250px; 
        }
        .feature-badge:hover { transform: translateX(10px); background: var(--card-hover-bg); }
        
        .badge-icon { width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--badge-icon-bg); }
        .badge-icon.cyan { color: #00d2ff; }
        .badge-icon.purple { color: #6a00ff; }
        .badge-icon.pink { color: #ff91f9; }
        
        .badge-text strong { display: block; color: var(--text-primary); font-size: 1rem; }
        .badge-text span { color: var(--text-secondary); font-size: 0.85rem; }

        .visual-column { display: flex; justify-content: center; align-items: center; height: 400px; }
        .tech-orb-container { position: relative; width: 300px; height: 300px; display: flex; justify-content: center; align-items: center; }
        .core-sphere { width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #00d2ff, #000); box-shadow: 0 0 60px rgba(0, 210, 255, 0.6); position: relative; z-index: 2; animation: pulseCore 3s infinite ease-in-out; }
        @keyframes pulseCore { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
        
        .orbit-ring { position: absolute; border-radius: 50%; border: 1px solid var(--orb-ring-color); box-shadow: 0 0 15px var(--orb-ring-border); }
        .ring-1 { width: 200px; height: 200px; border-color: rgba(0, 210, 255, 0.3); animation: spin 10s linear infinite; }
        .ring-2 { width: 280px; height: 280px; border-color: rgba(255, 145, 249, 0.2); animation: spin 15s linear infinite reverse; }
        .ring-3 { width: 350px; height: 350px; border-style: dashed; border-color: rgba(106, 0, 255, 0.2); animation: spin 25s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .data-point { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: white; box-shadow: 0 0 15px white; }
        .p1 { top: 20px; left: 50%; background: #ff91f9; animation: floatPoint 4s infinite; }
        .p2 { bottom: 40px; right: 20px; background: #00d2ff; animation: floatPoint 5s infinite reverse; }
        .p3 { top: 50%; left: -20px; background: #6a00ff; animation: floatPoint 6s infinite; }
        @keyframes floatPoint { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        
        .glass-stat-card { 
            position: absolute; bottom: 0; right: -20px; 
            background: var(--glass-card-bg); 
            backdrop-filter: blur(12px); 
            border: 1px solid var(--card-border); 
            padding: 10px 20px; border-radius: 30px; 
            display: flex; align-items: center; gap: 10px; 
            z-index: 5; animation: floatPoint 6s infinite ease-in-out; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .status-dot { width: 8px; height: 8px; background: #00ff9d; border-radius: 50%; box-shadow: 0 0 8px #00ff9d; }
        .stat-label-card { display: block; font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; }
        .stat-val-card { font-family: 'Orbitron', sans-serif; color: var(--text-primary); font-size: 0.9rem; }

        .stats-bar { 
            display: flex; justify-content: space-between; align-items: center; 
            background: var(--stats-bg); 
            border: 1px solid var(--stats-border); 
            border-radius: 20px; padding: 40px 60px; 
            box-shadow: var(--stats-shadow); 
        }
        .stat-item { display: flex; align-items: center; gap: 15px; flex: 1; justify-content: center; }
        .stat-content { text-align: left; }
        .stat-value { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; font-weight: 700; line-height: 1; margin-bottom: 5px; }
        .stat-label { font-size: 0.8rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
        .stat-divider { width: 1px; height: 50px; background: linear-gradient(to bottom, transparent, var(--stats-divider), transparent); }

        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
        .team-card { 
            background: var(--card-bg); 
            border: 1px solid var(--card-border); 
            border-radius: 20px; overflow: hidden; 
            transition: all 0.3s ease; 
        }
        .team-card:hover { transform: translateY(-5px); border-color: rgba(106, 0, 255, 0.3); box-shadow: var(--card-hover-shadow); }
        .team-img-wrapper { position: relative; height: 280px; background: linear-gradient(to bottom, var(--card-hover-bg), transparent); overflow: hidden; }
        .team-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
        .team-card:hover .team-img { transform: scale(1.05); }
        .team-socials { position: absolute; bottom: -50px; left: 0; width: 100%; display: flex; justify-content: center; gap: 10px; padding-bottom: 15px; transition: bottom 0.3s ease; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); }
        .team-card:hover .team-socials { bottom: 0; }
        
        .social-icon { 
            width: 36px; height: 36px; 
            background: var(--social-bg); 
            border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; 
            color: var(--social-icon-color); 
            cursor: pointer; transition: background 0.2s; 
        }
        .social-icon:hover { background: #6a00ff; color: white; }
        
        .team-info { padding: 20px; text-align: center; border-top: 1px solid var(--card-border); }
        .team-info h4 { color: var(--text-primary); font-family: 'Orbitron', sans-serif; margin-bottom: 5px; font-size: 1.1rem; }
        .team-info p { color: var(--text-secondary); font-size: 0.9rem; }

        .marquee-container { width: 100%; overflow: hidden; position: relative; padding: 40px 0; background: var(--card-bg); mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent); }
        .marquee-track { display: flex; gap: 40px; width: max-content; animation: scroll 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .partner-logo-card { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 150px; height: 100px; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; color: var(--text-secondary); transition: 0.3s; }
        .partner-logo-card:hover { color: var(--text-primary); border-color: #00d2ff; background: var(--card-hover-bg); }
        .partner-initials { font-size: 1.8rem; font-weight: 900; font-family: 'Orbitron', sans-serif; }
        .partner-name { font-size: 0.8rem; margin-top: 5px; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .testimonial-marquee-container { width: 100%; overflow: hidden; position: relative; padding: 20px 0; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
        .testimonial-track { display: flex; gap: 40px; width: max-content; animation: scroll 60s linear infinite; }
        .testimonial-track:hover { animation-play-state: paused; }

        .testimonial-card-scroll {
            width: 400px; flex-shrink: 0;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            padding: 30px; border-radius: 20px; position: relative; transition: 0.3s;
            display: flex; flex-direction: column; justify-content: space-between;
        }
        .testimonial-card-scroll:hover { border-color: rgba(255, 145, 249, 0.3); background: var(--card-hover-bg); transform: translateY(-2px); }

        .quote-icon { color: #ff91f9; opacity: 0.5; margin-bottom: 15px; }
        .testimonial-text { color: var(--text-muted); font-style: italic; font-size: 0.95rem; line-height: 1.6; margin-bottom: 20px; }
        
        .testimonial-author { display: flex; align-items: center; gap: 15px; border-top: 1px solid var(--card-border); padding-top: 15px; }
        .author-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6a00ff, #00d2ff); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-family: 'Orbitron', sans-serif; }
        .testimonial-author strong { display: block; color: var(--text-primary); font-family: 'Orbitron', sans-serif; font-size: 0.9rem; }
        .testimonial-author span { color: #00d2ff; font-size: 0.8rem; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 60px; }
          .section-title { font-size: 2.5rem; }
          .badges-row { flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .visual-column { order: -1; height: 300px; }
          .stats-bar { flex-wrap: wrap; padding: 30px; gap: 30px; }
          .stat-item { flex: 1 1 40%; justify-content: flex-start; }
          .stat-divider { display: none; }
          .testimonial-card-scroll { width: 300px; padding: 20px; }
        }
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