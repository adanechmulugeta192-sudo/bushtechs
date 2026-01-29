import React from "react";
import AdminSidebar from "./AdminSidebar";
// ✅ 1. IMPORT THE HEADER
import AdminHeader from "./AdminHeader"; 

// Using your hero bg or just a dark color
import bgHero from "../../assets/1hero-bg.jpg"; 

export default function AdminLayout({ children }) {
  const styles = {
    wrapper: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#05050a",
      position: "relative",
    },
    bgImage: {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundImage: `url(${bgHero})`,
      backgroundSize: "cover", backgroundPosition: "center",
      opacity: 0.1, 
      zIndex: 0, pointerEvents: "none", filter: "grayscale(100%)"
    },
    mainContent: {
      flex: 1,
      marginLeft: "260px", 
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
      position: "relative",
      zIndex: 1 
    },
    pageContent: {
      padding: "0 40px 40px 40px", // Removed top padding because Header has it
      flex: 1,
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.bgImage} />

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        
        {/* ✅ 2. PLACE HEADER HERE */}
        <AdminHeader />
        
        {/* Dashboard Content */}
        <div style={styles.pageContent}>
          {children}
        </div>

      </div>
    </div>
  );
}