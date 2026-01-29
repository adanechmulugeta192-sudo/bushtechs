// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom"; // If using React Router
import Footer from "./Footer";
import Sidebar from "./Sidebar"; // Assuming you have one
import Navbar from "./Navbar";   // Assuming you have one

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Sidebar (Left) */}
      <Sidebar />

      {/* Main Content Area (Right) */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        
        {/* Page Content */}
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet /> 
        </main>

        {/* Footer Controlled Here */}
        <Footer />
      </div>
    </div>
  );
}