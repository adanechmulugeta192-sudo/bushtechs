import React from "react";

export default function Home() {
  const linkStyle = {
    color: "#38bdf8",
    textDecoration: "none",
    transition: "opacity 0.2s",
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "50px",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      {/* Link 1: Hope Energy Frontend */}
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
        <a href="https://hope-energy-frontend-rho.vercel.app/" style={{ ...linkStyle, color: "inherit" }}>
          Hope Energy – Solar & Power Solutions
        </a>
      </h1>

      <p style={{ fontSize: "20px", marginTop: "10px", opacity: 0.9 }}>
        IT Solutions For A Digital-First World • Web Development • Mobile App Development • Branding • Business and Tech Consulting
      </p>

      <div style={{
        marginTop: "40px",
        padding: "20px",
        borderRadius: "12px",
        background: "#1e293b",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
      }}>
        <div>
          <h2 style={{ fontSize: "28px" }}>⚡ Our Services</h2>
          <ul style={{ marginTop: "15px", lineHeight: "32px" }}>
            <li>Solar System Design & Installation</li>
            <li>Battery Backup / Hybrid Power Solutions</li>
            <li>Maintenance & Service Contracts</li>
            <li>Energy Auditing & Optimization</li>
          </ul>
        </div>

        {/* Link 2: Kumacon1 Frontend Section */}
        <div style={{ borderLeft: "1px solid #334155", paddingLeft: "20px" }}>
          <h2 style={{ fontSize: "28px" }}>🚀 Featured Project</h2>
          <p style={{ marginTop: "15px" }}>
            Check out our latest development work:
          </p>
          <a 
            href="https://kumacon1-frontend.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              ...linkStyle, 
              display: "inline-block", 
              marginTop: "10px",
              padding: "10px 20px",
              background: "#38bdf8",
              color: "#0f172a",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            Visit Kumacon1
          </a>
        </div>
      </div>
    </div>
  );
}
