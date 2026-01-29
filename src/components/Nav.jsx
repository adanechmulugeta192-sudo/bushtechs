import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Moon, Sun, ChevronDown, ArrowRight, 
  Users, Target, Heart, Cpu, Menu, X, ChevronRight 
} from "lucide-react";
import { useTheme } from "../context/ThemeContext"; 
import logo from "../assets/favicon.png"; 

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutExpand, setMobileAboutExpand] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileAboutExpand(false);
  }, [location]);

  const aboutLinks = [
    { name: "Who We Are", path: "/about-us", icon: <Users size={18} /> },
    { name: "Mission & Vision", path: "/mission-vision", icon: <Target size={18} /> },
    { name: "Core Values", path: "/core-values", icon: <Heart size={18} /> },
    { name: "Technologies", path: "/technologies", icon: <Cpu size={18} /> },
  ];

  // --- THEME VARIABLES ---
  const navBg = isDark ? "rgba(5, 10, 20, 0.85)" : "rgba(255, 255, 255, 0.9)";
  const mobileBg = isDark ? "#050a14" : "#ffffff";
  const borderColor = isDark ? "rgba(100, 200, 255, 0.1)" : "rgba(0,0,0,0.07)";
  const textColor = isDark ? "#e2e8f0" : "#1e293b";
  const neonAccent = "#00d2ff"; 
  const primaryAccent = "#6a00ff";

  const styles = {
    nav: {
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      // Responsive padding: min 10px, preferred 5vw, max 60px
      padding: "0 clamp(10px, 5vw, 60px)", 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      zIndex: 9999, 
      boxSizing: "border-box",
      backgroundColor: navBg,
      backdropFilter: "blur(20px) saturate(180%)", 
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderBottom: `1px solid ${borderColor}`,
      boxShadow: isDark ? "0 10px 40px -10px rgba(0,0,0,0.8)" : "0 10px 40px -10px rgba(0,0,0,0.1)",
      transition: "all 0.4s ease",
    },
    logoImg: {
      height: "45px", 
      width: "auto", 
      objectFit: "contain",
      filter: isDark ? "drop-shadow(0 0 10px rgba(0, 210, 255, 0.5))" : "none",
    },
    getStarted: {
      padding: "10px 24px",
      background: `linear-gradient(135deg, ${primaryAccent}, #b000ff)`,
      color: "#fff",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 10px 20px -5px rgba(106, 0, 255, 0.5)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    dropdown: {
      position: "absolute",
      top: "75px", 
      left: "50%",
      transform: dropdownOpen ? "translateX(-50%) rotateX(0deg)" : "translateX(-50%) rotateX(-90deg)",
      transformOrigin: "top center",
      width: "280px",
      backgroundColor: isDark ? "#0a0c16" : "#ffffff",
      border: `1px solid ${isDark ? "rgba(106,0,255,0.3)" : "rgba(0,0,0,0.1)"}`,
      borderRadius: "16px",
      padding: "10px",
      opacity: dropdownOpen ? 1 : 0,
      visibility: dropdownOpen ? "visible" : "hidden",
      transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
      zIndex: 1000,
      boxShadow: isDark ? "0 25px 50px -12px rgba(0,0,0,0.9)" : "0 20px 40px -10px rgba(0,0,0,0.15)",
    }
  };

  return (
    <nav style={styles.nav}>
      
      {/* --- LOGO --- */}
      <Link to="/" style={{ display: "flex", alignItems: "center", zIndex: 10001, textDecoration: "none" }}>
        <img src={logo} alt="BushTechs Logo" style={styles.logoImg} />
        <span className="logo-text-responsive" style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: "900",
          fontSize: "1.5rem",
          letterSpacing: "1.5px",
          marginLeft: "12px", 
          background: `linear-gradient(135deg, #fff, ${neonAccent})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: isDark ? "transparent" : "#1a1a2e",
        }}>BushTechs</span>
      </Link>

      {/* --- DESKTOP MENU --- */}
      <div className="desktop-menu">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <span className="nav-text">Home</span>
          <div className="active-dot"></div>
        </Link>

        {/* Desktop Dropdown */}
        <div 
          className={`nav-item ${location.pathname.includes("about") ? "active" : ""}`}
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <span className="nav-text" style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            About Us <ChevronDown size={14} className={`chevron-anim ${dropdownOpen ? 'rotate' : ''}`} />
          </span>
          <div className="active-dot"></div>
          
          <div style={styles.dropdown}>
            {aboutLinks.map((link) => (
              <Link key={link.name} to={link.path} className="dropdown-row">
                <div className="icon-glass">{link.icon}</div>
                <div>
                  <div className="dd-title">{link.name}</div>
                  <div className="dd-desc">Explore our {link.name.toLowerCase()}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <Link to="/services" className={`nav-item ${location.pathname === "/services" ? "active" : ""}`}>
          <span className="nav-text">Services</span>
          <div className="active-dot"></div>
        </Link>
        
        <Link to="/projects" className={`nav-item ${location.pathname === "/projects" ? "active" : ""}`}>
          <span className="nav-text">Projects</span>
          <div className="active-dot"></div>
        </Link>
        
        <Link to="/contact" className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}>
          <span className="nav-text">Contact</span>
          <div className="active-dot"></div>
        </Link>

        {/* Desktop Button */}
        <Link to="/contact" style={styles.getStarted} className="shine-btn desk-btn">
          <span>Call Us</span> <ArrowRight size={18} />
        </Link>
      </div>

      {/* --- MOBILE CONTROLS --- */}
      <div className="mobile-controls">
        <button onClick={toggleTheme} className="theme-toggle">
          {isDark ? <Sun size={20} color="#fbbf24" /> : <Moon size={20} color="#6a00ff" />}
        </button>
        
        <button className="hamburger-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
           {mobileMenuOpen ? <X size={28} color={isDark ? "#fff" : "#000"} /> : <Menu size={28} color={isDark ? "#fff" : "#000"} />}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`mobile-menu-container ${mobileMenuOpen ? "open" : ""}`} style={{ backgroundColor: mobileBg }}>
        <div className="mobile-links">
          <Link to="/" className="mobile-link">Home <ChevronRight size={16} /></Link>
          
          {/* Mobile Accordion */}
          <div className="mobile-accordion">
            <div className="mobile-link" onClick={() => setMobileAboutExpand(!mobileAboutExpand)}>
              About Us <ChevronDown size={16} style={{ transform: mobileAboutExpand ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
            </div>
            <div className={`mobile-sublinks ${mobileAboutExpand ? "expanded" : ""}`}>
              {aboutLinks.map((link) => (
                <Link key={link.name} to={link.path} className="mobile-sublink">
                  {link.icon} {link.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/services" className="mobile-link">Services <ChevronRight size={16} /></Link>
          <Link to="/projects" className="mobile-link">Projects <ChevronRight size={16} /></Link>
          <Link to="/contact" className="mobile-link">Contact <ChevronRight size={16} /></Link>

          <Link to="/contact" className="mobile-cta-btn" style={styles.getStarted}>
            Get a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* --- GLOBAL STYLES FOR NAV --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;900&family=Inter:wght@400;600&display=swap');

        /* BASE LAYOUT */
        .desktop-menu { display: flex; align-items: center; gap: 15px; }
        .mobile-controls { display: flex; align-items: center; gap: 15px; }
        .hamburger-btn { display: none; background: none; border: none; cursor: pointer; }
        .mobile-menu-container { display: none; }

        /* NAV ITEMS */
        .nav-item {
          position: relative; text-decoration: none;
          color: ${isDark ? "#94a3b8" : "#475569"};
          font-weight: 600; font-size: 0.96rem; padding: 10px 15px;
          cursor: pointer; transition: all 0.3s ease;
        }
        .nav-text { font-family: 'Inter', sans-serif; position: relative; z-index: 2; }
        .nav-item:hover { color: ${isDark ? "#fff" : "#000"}; text-shadow: ${isDark ? "0 0 15px rgba(255,255,255,0.5)" : "none"}; }
        
        /* ACTIVE DOT */
        .active-dot {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-50%) scale(0);
          width: 20px; height: 3px; background: #00d2ff; border-radius: 4px;
          box-shadow: 0 -2px 10px #00d2ff; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-item.active .nav-text { color: ${isDark ? "#fff" : "#000"}; }
        .nav-item:hover .active-dot, .nav-item.active .active-dot { transform: translateX(-50%) scale(1); bottom: 5px; }

        /* DROPDOWN */
        .dropdown-row { display: flex; align-items: center; gap: 15px; padding: 12px; margin-bottom: 5px; border-radius: 12px; text-decoration: none; color: inherit; transition: all 0.2s; }
        .dropdown-row:hover { background: ${isDark ? "rgba(255,255,255,0.05)" : "#f8f9fa"}; transform: translateX(5px); }
        .icon-glass { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 10px; background: ${isDark ? "rgba(255,255,255,0.08)" : "#f1f5f9"}; color: #00d2ff; }
        .dd-title { font-weight: 700; font-size: 0.9rem; color: ${isDark ? "#fff" : "#1e293b"}; }
        .dd-desc { font-size: 0.75rem; color: #94a3b8; }
        .chevron-anim { transition: transform 0.3s; }
        .chevron-anim.rotate { transform: rotate(180deg); }

        /* BUTTONS */
        .shine-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(106, 0, 255, 0.5) !important; }
        .theme-toggle { background: ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"}; border: 1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 12px; transition: 0.3s; }
        .theme-toggle:hover { transform: rotate(15deg) scale(1.1); }

        /* =========================================
           RESPONSIVE MEDIA QUERIES
        ========================================= */

        /* TABLET & MOBILE (Max Width 1024px) */
        @media (max-width: 1024px) {
          .desktop-menu { display: none; }
          .hamburger-btn { display: block; }
          
          /* Full Screen Mobile Menu */
          .mobile-menu-container {
            display: block; position: fixed; top: 80px; left: 0; width: 100%; height: calc(100vh - 80px);
            padding: 30px; box-sizing: border-box; transform: translateX(100%); 
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
            overflow-y: auto; z-index: 9998;
          }
          .mobile-menu-container.open { transform: translateX(0); }

          /* Mobile Link Items */
          .mobile-links { display: flex; flex-direction: column; gap: 0; }
          .mobile-link {
            font-size: 1.2rem; font-weight: 700; color: ${textColor}; text-decoration: none;
            display: flex; justify-content: space-between; align-items: center; padding: 18px 0;
            border-bottom: 1px solid ${borderColor}; cursor: pointer;
          }
          
          /* Accordion Logic */
          .mobile-sublinks { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; padding-left: 10px; }
          .mobile-sublinks.expanded { max-height: 300px; margin-top: 5px; margin-bottom: 10px; }
          .mobile-sublink {
            display: flex; align-items: center; gap: 12px; padding: 12px 10px;
            color: ${isDark ? "#94a3b8" : "#64748b"}; text-decoration: none; font-size: 1rem;
            border-radius: 8px;
          }
          .mobile-sublink:active { background: ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}; }

          /* Mobile CTA Button */
          .mobile-cta-btn { margin-top: 30px; justify-content: center; width: 100%; padding: 15px; font-size: 1rem; }
        }

        /* SMALL MOBILE (Max Width 480px) */
        @media (max-width: 480px) {
           /* Resize Logo for very small screens */
           img[alt="BushTechs Logo"] { height: 35px !important; }
           .logo-text-responsive { font-size: 1.1rem !important; margin-left: 8px !important; }
           
           .theme-toggle { width: 35px; height: 35px; }
           .hamburger-btn svg { width: 24px; height: 24px; }
           
           .mobile-link { font-size: 1.1rem; padding: 15px 0; }
        }
      `}</style>
    </nav>
  );
}