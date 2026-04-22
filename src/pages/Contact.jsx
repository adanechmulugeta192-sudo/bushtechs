import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import bgTech from "../assets/tech-bg.jpg"; 
import { useTheme } from "../context/ThemeContext";

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service_type: "", message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Fetching from the corrected API endpoint
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Message Sent Successfully!");
        setFormData({ name: "", email: "", phone: "", service_type: "", message: "" });
      } else {
        const errorData = await res.json();
        alert(`❌ Failed: ${errorData.message || "Please try again later."}`);
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      alert("❌ Server is waking up or unreachable. Please try again in 1 minute.");
    } finally {
      setLoading(false);
    }
  };

  // --- THEME VARIABLES ---
  const themeVars = {
    "--bg-color": isDark ? "#05050a" : "#f8f9fa",
    "--text-head": isDark ? "#ffffff" : "#111827",
    "--text-body": isDark ? "#9ca3af" : "#4b5563",
    "--overlay": isDark 
      ? "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(10,5,20,0.95) 100%)"
      : "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.95) 100%)",
    "--card-bg": isDark ? "rgba(20, 20, 30, 0.6)" : "#ffffff",
    "--card-border": isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
    "--card-backdrop": "blur(12px)",
    "--card-radius": "24px",
    "--input-bg": isDark ? "rgba(0, 0, 0, 0.3)" : "#f3f4f6",
    "--input-border": isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e5e7eb",
    "--input-text": isDark ? "#ffffff" : "#111827",
    "--btn-gradient": "linear-gradient(90deg, #d900ff 0%, #00d2ff 100%)",
    "--icon-bg": isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0,0,0,0.05)",
    "--icon-color": "#d900ff"
  };

  return (
    <section className="contact-section" id="contact" style={themeVars}>
      
      <div className="bg-image" style={{ backgroundImage: `url(${bgTech})` }} />
      <div className="bg-overlay" />

      <div className="container">
        
        <div className="section-header">
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">Have a project in mind? We specialize in building scalable solutions.</p>
          <div className="glow-bar"></div>
        </div>

        <div className="contact-grid">
          
          <div className="glass-card form-card">
            <h3 className="card-title">Send us a message</h3>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="input-wrapper">
                  <input type="text" name="name" placeholder="Your Name" required className="form-input" value={formData.name} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                  <input type="email" name="email" placeholder="Your Email" required className="form-input" value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="input-wrapper">
                  <input type="tel" name="phone" placeholder="Phone Number" className="form-input" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="input-wrapper">
                  <select name="service_type" className="form-input select-input" value={formData.service_type} onChange={handleChange} required>
                    <option value="" disabled>Select Service Type</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="consulting">Tech Consulting</option>
                  </select>
                </div>
              </div>

              <div className="input-wrapper">
                <textarea name="message" placeholder="Tell us about your project..." rows="5" required className="form-input textarea" value={formData.message} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    Connecting... <Loader2 className="animate-spin" size={18} />
                  </span>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </div>

          <div className="info-column">
            
            <div className="glass-card info-card">
              <h3 className="card-title">Contact Info</h3>
              
              <div className="info-list">
                <div className="info-item">
                  <div className="icon-box"><Phone size={20}/></div>
                  <div>
                    <span className="label">Phone</span>
                    <p>+251 905 073 376</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-box"><Mail size={20}/></div>
                  <div>
                    <span className="label">Email</span>
                    <p>bushgraphics824@gmail.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-box"><MapPin size={20}/></div>
                  <div>
                    <span className="label">Location</span>
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-container">
              <iframe
                title="BushTechs Location"
                // ✅ Added actual Addis Ababa coordinates placeholder logic
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11545647575!2d38.7188701!3d8.9806034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24c49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1715450000000!5m2!1sen!2set"
                className="google-map"
                allowFullScreen=""
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@400;600&display=swap');

        .contact-section { position: relative; padding: 120px 20px; background-color: var(--bg-color); font-family: 'Inter', sans-serif; overflow: hidden; }
        .bg-image { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.15; z-index: 0; filter: grayscale(100%); }
        .bg-overlay { position: absolute; inset: 0; background: var(--overlay); z-index: 1; }
        .container { position: relative; z-index: 5; max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 50px; }
        .section-title { font-family: 'Orbitron', sans-serif; font-size: 3rem; font-weight: 800; color: var(--text-head); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
        .section-subtitle { color: var(--text-body); font-size: 1.1rem; margin-bottom: 20px; }
        .glow-bar { width: 80px; height: 4px; margin: 0 auto; background: var(--btn-gradient); box-shadow: 0 0 15px rgba(217, 0, 255, 0.5); border-radius: 2px; }
        .contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; }
        .glass-card { background: var(--card-bg); border: var(--card-border); backdrop-filter: var(--card-backdrop); border-radius: var(--card-radius); padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); }
        .card-title { font-family: 'Orbitron', sans-serif; color: var(--text-head); font-size: 1.5rem; margin-bottom: 30px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-input { width: 100%; padding: 16px; background: var(--input-bg); border: var(--input-border); border-radius: 12px; color: var(--text-head); font-size: 0.95rem; outline: none; transition: 0.3s; }
        .form-input:focus { border-color: #d900ff; background: rgba(0,0,0,0.5); }
        .submit-btn { width: 100%; padding: 16px; margin-top: 10px; background: var(--btn-gradient); border: none; border-radius: 50px; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.2s; box-shadow: 0 10px 30px rgba(217, 0, 255, 0.3); }
        .submit-btn:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(217, 0, 255, 0.5); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .info-column { display: flex; flex-direction: column; gap: 30px; }
        .info-list { display: flex; flex-direction: column; gap: 25px; }
        .info-item { display: flex; align-items: center; gap: 20px; }
        .icon-box { width: 50px; height: 50px; border-radius: 50%; background: var(--icon-bg); display: flex; align-items: center; justify-content: center; color: var(--icon-color); border: 1px solid rgba(255,255,255,0.1); }
        .label { display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--text-body); margin-bottom: 4px; }
        .map-container { height: 200px; border-radius: 24px; overflow: hidden; border: var(--card-border); transition: 0.3s; }
        .google-map { width: 100%; height: 100%; filter: grayscale(100%) invert(90%); }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } .section-title { font-size: 2.2rem; } }
      `}</style>
    </section>
  );
}
