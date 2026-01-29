import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Globe, Smartphone, Palette, Briefcase, ArrowRight, 
  Users, Layers, Calendar, MapPin, CheckCircle2, 
  ExternalLink, Mail, Phone, Clock, Send, Lightbulb, Zap, ArrowUpRight,
  AlertCircle, Loader2 
} from "lucide-react";

import BackToTopButton from "../components/BackToTopButton";   

// --- ASSETS ---
import heroBg from "../assets/1hero-bg.jpg"; 
import projectImg1 from "../assets/1project-1.jpg";
import bgTech from "../assets/tech-bg.jpg"; 

import { useTheme } from "../context/ThemeContext";
import "./global.css";

// --- API CONFIGURATION ---
const API_BASE = "http://localhost:5000";

/* =========================================
   MAIN HOME COMPONENT
========================================= */
export default function Home() {
  return (
    <div className="home-page-wrapper">
      <HeroSection />
      <AboutHighlight />
      <InteractiveServices />
      <ProjectsSection />
      <ContactSection />

      <BackToTopButton />

      <GlobalHomeStyles />
    </div>
  );
}

/* =========================================
   1. HERO SECTION
========================================= */
function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const styles = {
    heading: isDark ? "#ffffff" : "#1a1a2e",
    subText: isDark ? "#ffdfff" : "#4a4a6a",
    accentText: isDark ? "#ff91f9" : "#c026d3",
    watermark: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.05)",
    overlay: isDark
      ? "linear-gradient(135deg, rgba(10,0,40,0.95), rgba(0,30,60,0.9), rgba(30,0,50,0.95))"
      : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,245,255,0.9), rgba(255,245,255,0.95))",
    orbBorder: isDark ? "rgba(255,0,200,0.25)" : "rgba(100,0,100,0.15)",
    textShadow: isDark ? "0 8px 30px rgba(255,0,140,0.2)" : "none",
  };

  return (
    <section id="home" style={{ position: "relative", backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" }} className="hero-section-padding">
      <div style={{ position: "absolute", inset: 0, background: styles.overlay, zIndex: 1, transition: "background 0.5s ease" }} />

      {/* Watermark - Adjusted font size in CSS */}
      <div className="hero-watermark" style={{ color: styles.watermark }}>
        BUSHTECHS
      </div>

      <div className="container hero-container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Text Content */}
        <div className="hero-text-content">
          <div style={{ color: styles.accentText, fontWeight: 700, fontSize: "16px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "15px", display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '30px', height: '2px', background: styles.accentText }}></span> Innovating The Future
          </div>
          <h1 className="hero-title" style={{ color: styles.heading, textShadow: styles.textShadow }}>
            IT Solutions For <br /> A Digital-First World.
          </h1>
          <p className="hero-description" style={{ color: styles.subText }}>
            Transform your business with powerful, modern, colorful, and innovative digital solutions tailored for impact.
          </p>
          <div style={{ marginTop: "35px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#contact" className="hero-btn">Get a Quote <ArrowRight size={18} /></a>
            <a href="#projects" className="hero-btn-outline" style={{ color: styles.heading, borderColor: styles.heading }}>View Work</a>
          </div>
        </div>

        {/* 3D Orb Animation */}
        <div className="orb-container">
          <div className="orb-perspective">
            <div className="orb-core"></div>
            <div className="orb-ring" style={{ border: `2px dashed ${styles.orbBorder}` }}></div>
            <div className="orb-layer-1">
              {[0, 120, 240].map((deg, i) => (
                <div key={i} className="orb-icon-wrapper" style={{ transform: `rotateY(${deg}deg) translateZ(150px)` }}>
                  <div className="orb-icon">
                    {i === 0 ? <Globe size={30} /> : i === 1 ? <Smartphone size={30} /> : <Lightbulb size={30} />}
                  </div>
                </div>
              ))}
            </div>
            <div className="orb-glow"></div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================
   2. ABOUT HIGHLIGHT
========================================= */
function AboutHighlight() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const styles = {
    bg: isDark ? "#05050a" : "#f0f2f5",
    text: isDark ? "#ffffff" : "#111827",
    desc: isDark ? "#e2e8f0" : "#374151",
    glassBox: {
      background: isDark ? "rgba(20, 20, 30, 0.75)" : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      borderRadius: "24px",
      padding: "40px",
      border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(255, 255, 255, 0.8)",
      boxShadow: isDark ? "0 20px 40px rgba(0,0,0,0.4)" : "0 20px 40px rgba(0,0,0,0.05)",
    },
    highlight: "linear-gradient(90deg, #d900ff, #00d2ff)",
    statsBg: isDark ? "#0a0a12" : "#ffffff",
    statsBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    statsShadow: isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 10px 40px rgba(0,0,0,0.1)",
    statsLabel: isDark ? "#9ca3af" : "#4b5563",
  };

  const features = [
    { icon: <Globe size={28} />, title: "Web Dev", desc: "High-performance React websites." },
    { icon: <Smartphone size={28} />, title: "Mobile Apps", desc: "Native iOS & Android solutions." },
    { icon: <Palette size={28} />, title: "Branding", desc: "Visual identity & design systems." },
    { icon: <Briefcase size={28} />, title: "Consulting", desc: "Tech strategy & transformation." },
  ];

  const stats = [
    { value: "5+", label: "Engineers", color: "#4ade80", icon: <Users size={20}/> },
    { value: "15+", label: "Customers", color: "#facc15", icon: <Users size={20}/> },
    { value: "15+", label: "Projects", color: "#60a5fa", icon: <Layers size={20}/> },
    { value: "2025", label: "Established", color: "#f472b6", icon: <Calendar size={20}/> }
  ];

  return (
    <section style={{ backgroundColor: styles.bg, color: styles.text, position: "relative", paddingBottom: "80px" }}>
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

      <div className="about-bg" style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="about-overlay" style={{ background: isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)" }}></div>

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "80px" }}>
        <div className="split-layout">
          {/* Left Content */}
          <div className="left-content glass-padding-adjust" style={styles.glassBox}>
            <div style={{ display: "inline-block", padding: "5px 15px", borderRadius: "20px", background: styles.highlight, color: "white", fontSize: "0.8rem", fontWeight: "700", marginBottom: "15px", letterSpacing: "1px" }}>
               WHO WE ARE
            </div>
            <h2 className="main-title section-title-responsive" style={{ color: styles.text }}>
              About <br /> 
              <span className="gradient-text" style={{ background: styles.highlight, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                BushTechs Solutions
              </span>
            </h2>
            <p style={{ color: styles.desc, fontSize: "1.1rem", lineHeight: "1.7", marginTop: "20px", fontWeight: "500" }}>
              BushTechs is a modern technology provider delivering innovative, scalable, and user-focused digital solutions. 
              We specialize in helping businesses navigate the complexities of the digital world through creativity and precision.
            </p>
          </div>

          <div className="right-content feature-grid">
            {features.map((item, i) => (
              <div key={i} className="feature-item" style={{ 
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)", 
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
                  backdropFilter: "blur(5px)"
                }}>
                <div className="feature-icon" style={{ color: isDark ? "#ff91f9" : "#7c3aed" }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "5px", color: styles.text }}>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: styles.desc, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-bar" style={{ backgroundColor: styles.statsBg, borderColor: styles.statsBorder, boxShadow: styles.statsShadow }}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-content">
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label" style={{ color: styles.statsLabel }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   3. INTERACTIVE SERVICES
========================================= */
const SERVICES_DATA = [
  { id: 1, title: "Web Development", desc: "High-performance, responsive websites using React & Next.js.", icon: <Globe />, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop" },
  { id: 2, title: "Mobile Apps", desc: "Native and cross-platform mobile applications.", icon: <Smartphone />, img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop" },
  { id: 3, title: "Branding", desc: "Visual identities, logos, and design systems.", icon: <Palette />, img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop" },
  { id: 4, title: "Consulting", desc: "Digital transformation strategies and roadmaps.", icon: <Briefcase />, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop" },
];

function InteractiveServices() {
  const [activeId, setActiveId] = useState(1);
  const activeService = SERVICES_DATA.find((s) => s.id === activeId);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const styles = {
    bg: isDark ? "#05050a" : "#f8f9fa",
    text: isDark ? "#ffffff" : "#111827",
    overlay: isDark 
      ? "linear-gradient(to bottom, #05050a 0%, rgba(5,5,10,0.8) 50%, #05050a 100%)"
      : "linear-gradient(to bottom, #f8f9fa 0%, rgba(255,255,255,0.7) 50%, #f8f9fa 100%)",
    cardBg: isDark ? "#12121a" : "#ffffff",
    cardBorder: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
    cardShadow: isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.1)",
    desc: isDark ? "#94a3b8" : "#64748b",
    iconBg: isDark ? "#1f2937" : "#000000",
  };

  return (
    <section style={{ backgroundColor: styles.bg, padding: "80px 0 120px 0", position: "relative", marginTop: "-5px" }}>
      <div className="section-bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="section-overlay" style={{ background: styles.overlay }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 className="section-title section-title-responsive" style={{ color: styles.text }}>Our Services</h2>
          <div className="title-bar mx-auto"></div>
        </div>

        <div className="banner-wrapper">
          <img key={activeService.id} src={activeService.img} alt={activeService.title} className="banner-img animate-fade" />
          <div className="banner-overlay">
              <div className="banner-text-content"><h3>{activeService.title}</h3></div>
          </div>
        </div>

        <div className="services-row">
          {SERVICES_DATA.map((item) => (
            <div 
              key={item.id} 
              className={`service-card ${activeId === item.id ? "active-card" : ""}`}
              onClick={() => setActiveId(item.id)}
              style={{ backgroundColor: styles.cardBg, border: styles.cardBorder, boxShadow: styles.cardShadow }}
            >
              <div className="icon-box" style={{ backgroundColor: styles.iconBg }}>{item.icon}</div>
              <h3 style={{ color: styles.text, fontSize: "1.1rem", fontWeight: "700", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ color: styles.desc, fontSize: "0.9rem", lineHeight: "1.5", marginBottom: "15px" }}>{item.desc}</p>
              <div className="more-btn" style={{ color: activeId === item.id ? "#ff91f9" : (isDark ? "#fff" : "#333") }}>
                {activeId === item.id ? "ACTIVE" : "VIEW"} <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   4. PROJECTS SECTION
========================================= */
const PROJECTS_DATA = [
  { id: 1, title: "Hope Energy", img: projectImg1, category: "Energy", desc: "Pioneering renewable energy solutions.", location: "Addis Ababa", status: "Completed", year: "2025", link: "https://hopeenergy-emw.com/" },
  { id: 2, title: "KumaCon Construction", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", category: "Construction", desc: "Modern scalable construction showcase.", location: "Addis Ababa", status: "Completed", year: "2025", link: "#" },
];

function ProjectsSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const styles = {
    bg: isDark ? "#05050a" : "#f8f9fa",
    title: isDark ? "#ffffff" : "#111827",
    cardBg: isDark ? "rgba(255, 255, 255, 0.02)" : "#ffffff",
    cardBorder: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.1)",
    meta: isDark ? "#94a3b8" : "#64748b",
    desc: isDark ? "#cbd5e1" : "#475569",
  };

  return (
    <section id="projects" style={{ backgroundColor: styles.bg, padding: "80px 0", position: "relative" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2 className="section-title section-title-responsive" style={{ color: styles.title }}>Success Stories</h2>
          <p style={{ color: styles.meta }}>Delivering digital excellence for industry leaders.</p>
          <div className="title-bar mx-auto"></div>
        </div>

        <div className="projects-row">
          {PROJECTS_DATA.map((project) => (
            <article key={project.id} className="project-card" style={{ background: styles.cardBg, border: styles.cardBorder }}>
              <div className="image-wrapper">
                <img src={project.img} alt={project.title} className="project-img" />
                <div className="category-badge">{project.category}</div>
                <div className="hover-overlay">
                   <a href={project.link} className="view-btn">View <ExternalLink size={16} /></a>
                </div>
              </div>
              <div className="card-body">
                <div className="meta-row" style={{ color: styles.meta }}>
                  <span className="meta-item"><MapPin size={14} /> {project.location}</span>
                </div>
                <h3 className="project-title" style={{ color: styles.title }}>{project.title}</h3>
                <p className="project-desc" style={{ color: styles.desc }}>{project.desc}</p>
                <div className="footer-row">
                    <span className="status-badge completed"><CheckCircle2 size={14} /> {project.status}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   5. CONTACT SECTION
========================================= */
function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus({ loading: false, success: false, error: "Please fill in all fields." });
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus({ loading: false, success: false, error: "Failed to send message." });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Server Error." });
    }
  };

  // CSS Variables for Contact Section
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8f9fa",
    "--text-head": isDark ? "#ffffff" : "#111827",
    "--text-body": isDark ? "#9ca3af" : "#4b5563",
    "--overlay": isDark ? "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(10,5,20,0.95) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.95) 100%)",
    "--card-bg": isDark ? "rgba(20, 20, 30, 0.6)" : "#ffffff",
    "--card-border": isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
    "--input-bg": isDark ? "rgba(0, 0, 0, 0.3)" : "#f3f4f6",
    "--input-border": isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e5e7eb",
    "--btn-gradient": "linear-gradient(90deg, #d900ff 0%, #00d2ff 100%)",
  };

  return (
    <section className="contact-section" id="contact" style={themeVars}>
      <div className="bg-image" style={{ backgroundImage: `url(${bgTech})` }} />
      <div className="bg-overlay" />

      <div className="container">
        <div className="section-header">
          <h2 className="section-title section-title-responsive">Let's Work Together</h2>
          <p className="section-subtitle">We build scalable solutions.</p>
          <div className="glow-bar"></div>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="glass-card form-card">
            {status.success && <div className="success-msg"><CheckCircle2 size={18}/> Message Sent!</div>}
            {status.error && <div className="error-msg"><AlertCircle size={18}/> {status.error}</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Name *" required className="form-input" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email *" required className="form-input" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-row">
                <input type="tel" name="phone" placeholder="Phone *" className="form-input" required value={formData.phone} onChange={handleChange} />
                <select name="service" className="form-input select-input" value={formData.service} onChange={handleChange}>
                  <option value="">Select Service</option>
                  <option value="Web">Web Development</option>
                  <option value="Mobile">Mobile App</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
              <textarea name="message" placeholder="Project Details..." rows="4" required className="form-input textarea" value={formData.message} onChange={handleChange}></textarea>
              
              <button type="submit" className="submit-btn" disabled={status.loading}>
                {status.loading ? "Sending..." : "Send Message"} <Send size={18} />
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="info-column">
            <div className="glass-card info-card">
              <h3 className="card-title" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Contact Info</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="icon-box-small"><Phone size={18}/></div>
                  <p>+251 905 073 376</p>
                </div>
                <div className="info-item">
                  <div className="icon-box-small"><Mail size={18}/></div>
                  <p>bushgtechs824@gmail.com</p>
                </div>
                <div className="info-item">
                  <div className="icon-box-small"><MapPin size={18}/></div>
                  <p>Addis Ababa, Ethiopia</p>
                </div>
              </div>
            </div>
            <div className="map-container">
              <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.7440639643213!2d38.7592325!3d9.006140199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b853a82bc4563%3A0x7f8cd79dc2ed216!2sMeskel%20Flower!5e0!3m2!1sen!2set!4v1708052525689" className="google-map" allowFullScreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section { position: relative; padding: 100px 20px; background-color: var(--bg-color); font-family: 'Inter', sans-serif; overflow: hidden; }
        .bg-image { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.15; z-index: 0; filter: grayscale(100%); }
        .bg-overlay { position: absolute; inset: 0; background: var(--overlay); z-index: 1; }
        .section-header { text-align: center; margin-bottom: 40px; }
        .section-subtitle { color: var(--text-body); font-size: 1.1rem; margin-bottom: 20px; }
        .glow-bar { width: 80px; height: 4px; margin: 0 auto; background: var(--btn-gradient); box-shadow: 0 0 15px rgba(217, 0, 255, 0.5); border-radius: 2px; }
        .contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; position: relative; z-index: 5; }
        .glass-card { background: var(--card-bg); border: var(--card-border); backdrop-filter: blur(12px); border-radius: 24px; padding: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .form-input { width: 100%; padding: 14px; background: var(--input-bg); border: var(--input-border); border-radius: 12px; color: var(--text-head); outline: none; transition: 0.3s; }
        .form-input:focus { border-color: #d900ff; box-shadow: 0 0 0 4px rgba(217, 0, 255, 0.1); }
        .submit-btn { width: 100%; padding: 14px; margin-top: 10px; background: var(--btn-gradient); border: none; border-radius: 50px; color: white; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        .submit-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(217, 0, 255, 0.4); }
        .icon-box-small { width: 40px; height: 40px; border-radius: 50%; background: rgba(132, 0, 255, 0.1); display: flex; align-items: center; justify-content: center; color: #d900ff; }
        .info-list { display: flex; flex-direction: column; gap: 20px; }
        .info-item { display: flex; align-items: center; gap: 15px; color: var(--text-head); font-weight: 500; }
        .map-container { height: 200px; border-radius: 24px; overflow: hidden; border: var(--card-border); margin-top: 0; }
        .google-map { width: 100%; height: 100%; border: 0; filter: grayscale(100%) invert(92%) contrast(83%); }
        .success-msg { color: #4ade80; background: rgba(74, 222, 128, 0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px; display: flex; gap: 10px; align-items: center; }
        .error-msg { color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px; display: flex; gap: 10px; align-items: center; }
        
        @media (max-width: 900px) { 
            .contact-grid { grid-template-columns: 1fr; } 
            .form-row { grid-template-columns: 1fr; }
            .section-title-responsive { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
}

/* =========================================
   GLOBAL CSS STYLES (RESPONSIVE)
========================================= */
function GlobalHomeStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap');
      
      /* UTILS */
      .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; width: 100%; }
      .section-title { font-family: 'Orbitron', sans-serif; font-size: 2.5rem; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; }
      .title-bar { width: 60px; height: 4px; background: #ff91f9; border-radius: 2px; margin: 0 auto 20px auto; box-shadow: 0 0 10px #ff91f9; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      .gradient-text { filter: drop-shadow(0 0 15px rgba(217,0,255,0.3)); font-family: 'Orbitron', sans-serif; fontWeight: 900; text-transform: uppercase; letter-spacing: 2px; }

      /* HERO SECTION LAYOUT */
      .hero-section-padding { padding: 120px 0; }
      .hero-watermark {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        fontSize: 12vw; fontWeight: 900; zIndex: 1; whiteSpace: nowrap; pointerEvents: none; 
        fontFamily: 'Orbitron', sans-serif; letterSpacing: 10px; userSelect: none;
      }
      .hero-container { display: flex; gap: 40px; alignItems: center; flex-wrap: wrap; justify-content: space-between; }
      .hero-text-content { flex: 1; min-width: 300px; z-index: 5; }
      .hero-title { fontFamily: 'Orbitron', sans-serif; fontSize: clamp(2.2rem, 5vw, 3.5rem); fontWeight: 900; lineHeight: 1.1; textTransform: uppercase; }
      .hero-description { marginTop: 16px; maxWidth: 540px; fontSize: 1.1rem; opacity: 0.95; lineHeight: 1.6; }
      
      /* BUTTONS */
      .hero-btn {
        background: linear-gradient(90deg, #ff00d4, #6a00ff, #00d2ff);
        padding: 12px 26px; border-radius: 12px; font-weight: 700; color: #fff; text-decoration: none;
        box-shadow: 0 8px 25px rgba(255,0,220,0.35); transition: 0.3s; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      }
      .hero-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 35px rgba(255,0,220,0.5); }
      
      .hero-btn-outline {
        background: transparent; border: 2px solid; padding: 12px 26px; border-radius: 12px; font-weight: 700;
        text-decoration: none; transition: 0.3s; display: inline-flex; align-items: center; justify-content: center;
      }
      .hero-btn-outline:hover { background: rgba(255,255,255,0.1); }

      /* ORB ANIMATION */
      .orb-container { width: 440px; height: 340px; position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .orb-perspective { width: 360px; height: 280px; perspective: 1000px; position: relative; }
      .orb-core { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 190px; height: 190px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,0,180,0.55), rgba(0,110,255,0.4), rgba(0,255,180,0.25)); box-shadow: 0 0 40px rgba(255,0,220,0.4), 0 0 80px rgba(0,150,255,0.3); border: 2px solid rgba(255,255,255,0.15); }
      .orb-ring { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%) rotateX(65deg); width: 360px; height: 360px; border-radius: 50%; box-shadow: 0 0 50px rgba(255,0,220,0.2); }
      .orb-layer-1 { position: absolute; inset: 0; transform-style: preserve-3d; animation: spinY 9s linear infinite; }
      .orb-icon-wrapper { position: absolute; left: 50%; top: 50%; }
      .orb-icon { width: 75px; height: 75px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #ff00d4, #6a00ff, #00d2ff); box-shadow: 0 10px 35px rgba(255,0,220,0.5); color: #fff; }
      .orb-glow { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(255,0,200,0.2), rgba(0,140,255,0.12)); filter: blur(35px); pointer-events: none; }
      @keyframes spinY { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }

      /* PARTICLES & WAVE */
      .tech-wave-top { position: absolute; top: 0; left: 0; width: 100%; height: 120px; z-index: 10; pointer-events: none; overflow: hidden; }
      .tech-wave-top svg { width: 100%; height: 100%; transform: scaleX(1.1); }
      .animated-path { stroke-dasharray: 1440; stroke-dashoffset: 1440; animation: drawLine 4s ease-out forwards; }
      @keyframes drawLine { to { stroke-dashoffset: 0; } }

      /* ABOUT LAYOUT */
      .about-bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; opacity: 0.4; }
      .about-overlay { position: absolute; inset: 0; z-index: 1; }
      .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 50px; }
      .feature-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .feature-item { padding: 20px; border-radius: 12px; transition: 0.3s; border: 1px solid transparent; }
      .stats-bar { display: flex; justify-content: space-around; align-items: center; border-radius: 20px; padding: 30px; position: relative; overflow: hidden; flex-wrap: wrap; gap: 20px; }
      .stat-item { display: flex; align-items: center; justify-content: center; }
      .stat-value { font-size: 2.5rem; font-weight: 900; line-height: 1; margin-bottom: 5px; font-family: 'Orbitron', sans-serif; }
      .stat-label { font-size: 0.8rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }

      /* SERVICES */
      .section-bg { position: absolute; inset: 0; background-size: cover; background-position: center; z-index: 0; opacity: 0.15; filter: grayscale(100%); }
      .section-overlay { position: absolute; inset: 0; z-index: 1; }
      .banner-wrapper { position: relative; width: 100%; height: 400px; overflow: hidden; background: #111; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
      .banner-img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.9) contrast(1.1); }
      .banner-overlay { position: absolute; inset: 0; background: radial-gradient(circle at top right, rgba(255,145,249,0.15), transparent 60%); display: flex; align-items: center; justify-content: center; }
      .banner-text-content h3 { color: rgba(255, 255, 255, 0.9); font-size: clamp(3rem, 6vw, 5rem); font-weight: 900; text-transform: uppercase; letter-spacing: 5px; opacity: 0.8; text-align: center; mix-blend-mode: overlay; padding: 0 20px; }
      .animate-fade { animation: zoomFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      @keyframes zoomFade { 0% { opacity: 0; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }

      .services-row { display: flex; justify-content: center; align-items: stretch; gap: 20px; width: 100%; margin-top: -80px; position: relative; z-index: 10; flex-wrap: wrap; }
      .service-card { flex: 1; min-width: 250px; padding: 25px; border-radius: 16px; backdrop-filter: blur(12px); transition: 0.35s ease; position: relative; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; }
      .service-card:hover, .active-card { transform: translateY(-10px); border-color: rgba(255, 0, 255, 0.4) !important; box-shadow: 0 20px 40px rgba(255,0,255,0.3) !important; }
      .icon-box { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
      .active-card .icon-box { background: #ff91f9 !important; }
      .more-btn { margin-top: auto; font-weight: 800; font-size: 0.8rem; letter-spacing: 1px; display: flex; align-items: center; gap: 5px; }

      /* PROJECTS */
      .projects-row { display: flex; justify-content: center; align-items: flex-start; gap: 30px; width: 100%; flex-wrap: wrap; }
      .project-card { width: 100%; max-width: 400px; border-radius: 16px; backdrop-filter: blur(12px); box-shadow: 0 6px 25px rgba(0,0,0,0.1); transition: 0.35s ease; position: relative; overflow: hidden; display: flex; flex-direction: column; }
      .project-card:hover { transform: translateY(-5px); border-color: #00d2ff !important; }
      .image-wrapper { position: relative; height: 220px; width: 100%; }
      .project-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
      .project-card:hover .project-img { transform: scale(1.05); }
      .card-body { padding: 25px; flex: 1; display: flex; flex-direction: column; }
      .project-title { font-size: 1.3rem; font-weight: 700; margin: 5px 0 10px 0; }
      .project-desc { font-size: 0.95rem; margin-bottom: 20px; line-height: 1.5; flex-grow: 1; }
      .category-badge { position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.7rem; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; font-weight: 700; }
      .hover-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; }
      .project-card:hover .hover-overlay { opacity: 1; }
      .view-btn { background: #fff; color: #000; padding: 10px 20px; border-radius: 30px; font-weight: 700; text-decoration: none; display: flex; gap: 5px; align-items: center; }
      .footer-row { margin-top: auto; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); }
      .status-badge { font-size: 0.75rem; color: #34d399; display: flex; gap: 5px; align-items: center; text-transform: uppercase; font-weight: 700; }

      /* =========================================
         RESPONSIVE MEDIA QUERIES
      ========================================= */
      
      /* TABLET (Max-Width 1024px) */
      @media (max-width: 1024px) {
        .orb-container { width: 350px; height: 300px; }
        .orb-perspective, .orb-ring { width: 280px; height: 280px; }
        .split-layout { gap: 40px; }
      }

      /* SMALL LAPTOP / TABLET VERTICAL (Max-Width 900px) */
      @media (max-width: 900px) {
        .hero-container { justify-content: center; text-align: center; }
        .hero-text-content { align-items: center; display: flex; flex-direction: column; }
        .orb-container { display: none; } /* Hide Orb on smaller screens to save space */
        
        .split-layout { grid-template-columns: 1fr; }
        .services-row { margin-top: 20px; } /* Reset negative margin */
        .banner-wrapper { height: 250px; }
        .contact-grid { grid-template-columns: 1fr; }
        .section-title { font-size: 2rem; }
        .main-title { font-size: 2.5rem; }
      }

      /* MOBILE (Max-Width 600px) */
      @media (max-width: 600px) {
        .container { padding: 0 15px; }
        
        /* Hero */
        .hero-section-padding { padding: 80px 0; }
        .hero-title { font-size: 2.2rem; }
        .hero-watermark { font-size: 15vw; opacity: 0.03; }
        .hero-btn, .hero-btn-outline { width: 100%; justify-content: center; }
        
        /* About */
        .glass-padding-adjust { padding: 25px !important; }
        .feature-grid { grid-template-columns: 1fr; }
        .stats-bar { flex-direction: column; gap: 30px; text-align: center; }
        
        /* Services */
        .services-row { gap: 15px; }
        .service-card { width: 100%; }
        
        /* Contact */
        .form-row { grid-template-columns: 1fr; }
        .glass-card { padding: 20px; }
      }
    `}</style>
  );
}