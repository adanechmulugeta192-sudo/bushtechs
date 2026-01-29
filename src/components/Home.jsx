import React from "react";

export default function Home() {
  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      padding: "50px",
      fontFamily: "Segoe UI, Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
        Hope Energy – Solar & Power Solutions
      </h1>

      <p style={{ fontSize: "20px", marginTop: "10px", opacity: 0.9 }}>
        IT Solutions For A Digital-First World • Web Development • Mobile App Development • Branding • Business and Tech Consulting
      </p>

      <div style={{
        marginTop: "40px",
        padding: "20px",
        borderRadius: "12px",
        background: "#1e293b"
      }}>
        <h2 style={{ fontSize: "28px" }}>⚡ Our Services</h2>
        <ul style={{ marginTop: "15px", lineHeight: "32px" }}>
          <li>Solar System Design & Installation</li>
          <li>Battery Backup / Hybrid Power Solutions</li>
          <li>Maintenance & Service Contracts</li>
          <li>Energy Auditing & Optimization</li>
        </ul>
      </div>
    </div>
  );
}
