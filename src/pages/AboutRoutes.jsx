import React, { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Zap, Users, Layers, Calendar, Linkedin, Twitter, Quote } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg"; 
import { useTheme } from "../context/ThemeContext"; 

// ✅ DYNAMIC API CONFIG (Matches your Render Backend)
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

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

    // ✅ FIXED: Added /api/ to match your backend server.js routes
    const fetchData = async () => {
      try {
        // 1. General About Info
        const aboutRes = await fetch(`${API_BASE}/api/about-info`);
        if (aboutRes.ok) {
          const data = await aboutRes.json();
          if (data && data.content) setAboutData(data);
        }

        // 2. Team Members
        const teamRes = await fetch(`${API_BASE}/api/team`);
        if (teamRes.ok) {
          const data = await teamRes.json();
          setTeamMembers(data);
        }

        // 3. Testimonials
        const testRes = await fetch(`${API_BASE}/api/testimonials`);
        if (testRes.ok) {
          const data = await testRes.json();
          if (Array.isArray(data)) setTestimonials(data);
        }

        // 4. Partners
        const partnerRes = await fetch(`${API_BASE}/api/partners`);
        if (partnerRes.ok) {
          const data = await partnerRes.json();
          if (Array.isArray(data)) setPartners(data);
        }
      } catch (err) {
        console.error("Connection Error (Check if Render is awake):", err);
      }
    };

    fetchData();
  }, []);

  const getImg = (path) => {
    if (!path) return "https://via.placeholder.com/150?text=No+Image";
    if (path.startsWith("http")) return path;
    return `${API_BASE}${path}`;
  };

  // ✅ THEME VARIABLES (Simplified for readability)
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8fafc", 
    "--text-primary": isDark ? "#ffffff" : "#0f172a",
    "--text-secondary": isDark ? "#94a3b8" : "#475569",
    "--text-muted": isDark ? "#cbd5e1" : "#64748b",
    "--overlay-gradient": isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(10,10,25,0.85) 50%, #05050a 100%)"
      : "linear-gradient(to bottom, #f8fafc 0%, rgba(255,255,255,0.9) 50%, #f8fafc 100%)",
    "--bg-image-opacity": isDark ? "0.2" : "0.05",
    "--card-bg": isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
    "--card-border": isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
    "--card-hover-shadow": isDark ? "0 15px 35px rgba(0,0,0,0.6)" : "0 10px 30px rgba(0,0,0,0.05)",
    "--stats-bg": isDark ? "#0a0a12" : "#ffffff",
    "--stats-border": isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    "--glass-card-bg": isDark ? "rgba(15, 20, 35, 0.8)" : "rgba(255, 255, 255, 0.9)",
    "--badge-bg": isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
    "--social-bg": isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    "--social-icon-color": isDark ? "#ffffff" : "#333333",
  };

  return (
    <section className="about-section" style={themeVars}>
      {/* BACKGROUNDS */}
      <div className="bg-image" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="bg-overlay" />
      
      {isDark && (
        <>
          <div className="glow-orb top-right" />
          <div className="glow-orb bottom-left" />
        </>
      )}

      <div className="container">
        {/* SECTION 1: HERO */}
        <div className="about-grid">
          <div className="content-column">
            <div className="section-tag">{aboutData.content.sectionTitle}</div>
            <h1 className="section-title">{aboutData.content.mainHeadline}</h1>
            <div className="glow-divider"></div>
            <h3 className="sub-headline">{aboutData.content.subHeadline}</h3>
            <p className="description">{aboutData.content.description}</p>

            <div className="badges-row">
              <BadgeItem icon={<ShieldCheck size={20} />} title="Trust" text="Secure & Reliable" color="cyan" />
              <BadgeItem icon={<Sparkles size={20} />} title="Innovation" text="Creative Solutions" color="purple" />
              <BadgeItem icon={<Zap size={20} />} title="Speed" text="High Performance" color="pink" />
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

        {/* STATS BAR */}
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

        {/* TEAM SECTION */}
        <div className="centered-header">
            <div className="section-tag">The Minds Behind</div>
            <h2 className="section-subtitle">Our <span className="highlight">Leadership & Team</span></h2>
        </div>

        <div className="team-grid">
          {teamMembers.length > 0 ? (
            teamMembers.map((m) => (
              <div key={m.id} className="team-card">
                <div className="team-img-wrapper">
                  <img src={getImg(m.image)} alt={m.name} className="team-img" />
                  <div className="team-socials">
                    {m.linkedin_url && <a href={m.linkedin_url} target="_blank" rel="noreferrer" className="social-icon"><Linkedin size={18} /></a>}
                    {m.twitter_url && <a href={m.twitter_url} target="_blank" rel="noreferrer" className="social-icon"><Twitter size={18} /></a>}
                  </div>
                </div>
                <div className="team-info">
                  <h4>{m.name}</h4>
                  <p>{m.role}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No team members added yet.</p>
          )}
        </div>

        <div className="spacer-80"></div>

        {/* PARTNERS SECTION */}
        <div className="centered-header">
            <div className="section-tag">Trusted By</div>
            <h2 className="section-subtitle">Our <span className="highlight">Partners</span></h2>
        </div>

        <div className="marquee-container">
          <div className="marquee-track">
            {partners.map((p, i) => (
              <div key={i} className="partner-card">
                <img src={getImg(p.logo)} alt={p.name} className="partner-logo" style={{ maxWidth: "120px", maxHeight: "80px", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section { 
          position: relative; padding: 100px 20px; background-color: var(--bg-color); 
          color: var(--text-primary); transition: 0.3s ease; overflow: hidden; 
        }
        .bg-image { 
          position: absolute; inset: 0; opacity: var(--bg-image-opacity); 
          filter: grayscale(100%); background-size: cover; z-index: 0; 
        }
        .bg-overlay { position: absolute; inset: 0; background: var(--overlay-gradient); z-index: 1; }
        .container { position: relative; z-index: 2; max-width: 1250px; margin: 0 auto; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; margin-bottom: 80px; }
        .section-tag { color: #ff91f9; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; font-weight: bold; }
        .section-title { font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin: 0; }
        .highlight { background: linear-gradient(90deg, #ff91f9, #6a00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glow-divider { height: 4px; width: 80px; margin: 20px 0; background: linear-gradient(90deg, #6a00ff, #ff91f9); border-radius: 4px; }
        .description { color: var(--text-secondary); line-height: 1.8; margin-bottom: 40px; }
        .badges-row { display: flex; flex-direction: column; gap: 20px; }
        .feature-badge { display: flex; align-items: center; gap: 15px; background: var(--badge-bg); border: 1px solid var(--card-border); padding: 15px; border-radius: 16px; width: fit-content; min-width: 250px; }
        .stats-bar { display: flex; justify-content: space-between; background: var(--stats-bg); border: 1px solid var(--stats-border); border-radius: 20px; padding: 40px; box-shadow: var(--card-hover-shadow); }
        .stat-value { font-size: 2.5rem; font-weight: 700; }
        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
        .team-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 20px; overflow: hidden; transition: 0.3s; }
        .team-card:hover { transform: translateY(-5px); box-shadow: var(--card-hover-shadow); }
        .team-img-wrapper { height: 300px; overflow: hidden; position: relative; }
        .team-img { width: 100%; height: 100%; object-fit: cover; }
        .no-data { text-align: center; width: 100%; color: var(--text-secondary); grid-column: 1 / -1; }
        @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } .visual-column { display: none; } }
      `}</style>
    </section>
  );
}

function BadgeItem({ icon, title, text, color }) {
  return (
    <div className="feature-badge">
      <div className={`badge-icon ${color}`}>{icon}</div>
      <div className="badge-text"><strong>{title}</strong><span>{text}</span></div>
    </div>
  );
}

function StatItem({ icon, value, label, color }) {
  return (
    <div className="stat-item">
      <div className="stat-content">
        <div className="stat-value" style={{ color: color }}>{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
