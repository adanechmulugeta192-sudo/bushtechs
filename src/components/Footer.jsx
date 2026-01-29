// src/components/Footer.jsx
import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";
import { useLocation } from "react-router-dom"; 

export default function Footer() {
  const location = useLocation();

  // 1. CONTROL LOGIC: define paths where footer should NOT appear
  const hiddenRoutes = ["/login", "/register", "/forgot-password"];
  
  // ✅ NEW LOGIC: Check if we are on an Admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // If current path is in hiddenRoutes OR is an Admin route, return null (render nothing)
  if (hiddenRoutes.includes(location.pathname) || isAdminRoute) {
    return null;
  }

  return (
    <footer
      style={{
        padding: "40px 0 20px",
        textAlign: "center",
        background: "linear-gradient(180deg, rgba(0,20,40,0.95), rgba(0,8,25,1))",
        borderTop: "1px solid rgba(0,255,255,0.15)",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.5)",
        marginTop: "auto", 
        width: "100%",
        position: "relative",
        zIndex: 10
      }}
    >
      <div style={{ maxWidth: 1100, margin: "auto", padding: "0 20px" }}>
        
        {/* SOCIAL MEDIA ICONS with Hover Effect */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 25,
            flexWrap: "wrap",
          }}
        >
          <SocialIcon href="https://web.facebook.com/profile.php?id=100007245858030"><Facebook size={20} /></SocialIcon>
          <SocialIcon href="https://www.instagram.com/bu.sh5989"><Instagram size={20} /></SocialIcon>
          <SocialIcon href="https://et.linkedin.com/in/chimdesa-gedefa-917706203"><Linkedin size={20} /></SocialIcon>
          <SocialIcon href="https://www.researchgate.net/profile/Chimdesa-Gedefa"><Github size={20} /></SocialIcon>
          <SocialIcon href="mailto:bushtechs824@gmail.com"><Mail size={20} /></SocialIcon>
        </div>

        {/* COPYRIGHT */}
        <div
          style={{
            color: "#b7d9ff",
            fontSize: 14,
            marginBottom: 8,
            textShadow: "0 0 10px rgba(0,255,255,0.3)",
          }}
        >
          © {new Date().getFullYear()} BushTechs — All Rights Reserved
        </div>

        <div
          style={{
            color: "#7a9abd",
            fontSize: 12,
            opacity: 0.7,
            letterSpacing: 0.5,
          }}
        >
          Web Development • Mobile App • Branding • Consulting
        </div>
      </div>

      {/* GLOW LINE */}
      <div
        style={{
          marginTop: 25,
          height: 1,
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          background: "linear-gradient(90deg, transparent, #00eaff, transparent)",
          boxShadow: "0 0 15px rgba(0,255,255,0.6)",
        }}
      ></div>
    </footer>
  );
}

// Internal component to handle Hover State for inline styles
const SocialIcon = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    color: isHovered ? "#fff" : "#9ee9ff",
    background: isHovered ? "rgba(0, 255, 255, 0.2)" : "transparent",
    padding: 10,
    borderRadius: "50%",
    border: `1px solid ${isHovered ? "#00eaff" : "rgba(0,255,255,0.25)"}`,
    boxShadow: isHovered ? "0 0 15px rgba(0,255,255,0.6)" : "0 0 12px rgba(0,255,255,0.1)",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
};