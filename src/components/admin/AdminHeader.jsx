import React, { useState, useEffect, useRef } from "react";
import { Bell, Camera } from "lucide-react"; // Added Camera icon
import { useLocation } from "react-router-dom";

const API_BASE = "http://localhost:5000";

export default function AdminHeader() {
  const location = useLocation();
  const fileInputRef = useRef(null); // Reference to hidden input
  const [user, setUser] = useState({ id: null, name: "Admin", image: null });
  const [uploading, setUploading] = useState(false);

  // 1. Load User on Mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 2. Handle File Selection & Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userId", user.id); // Send User ID to know who to update

    try {
      const res = await fetch(`${API_BASE}/api/auth/update-picture`, {
        method: "POST",
        body: formData, // No headers needed for FormData, browser sets it automatically
      });

      const data = await res.json();

      if (res.ok) {
        // Update Local State
        const updatedUser = { ...user, image: data.image };
        setUser(updatedUser);
        
        // Update LocalStorage so it persists on refresh
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("✅ Profile picture updated!");
      } else {
        alert("❌ Failed to update picture");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server Error");
    } finally {
      setUploading(false);
    }
  };

  // 3. Helper for Image URL
  const getProfileImage = () => {
    if (!user.image) return "https://ui-avatars.com/api/?name=Admin&background=6a00ff&color=fff"; 
    if (user.image.startsWith("http")) return user.image;
    return `${API_BASE}${user.image}`;
  };

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "admin") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const styles = {
    header: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "20px 40px", marginBottom: "20px",
      background: "transparent", position: "sticky", top: 0, zIndex: 50
    },
    titleSection: { display: "flex", flexDirection: "column" },
    pageTitle: { fontSize: "1.2rem", fontWeight: "700", color: "#fff", margin: 0, fontFamily: "'Orbitron', sans-serif" },
    
    rightSection: { display: "flex", alignItems: "center", gap: "20px" },
    
    iconBtn: {
      background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%",
      width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", cursor: "pointer", position: "relative"
    },
    badge: {
      position: "absolute", top: "8px", right: "10px", width: "8px", height: "8px",
      background: "#ef4444", borderRadius: "50%"
    },
    
    // Updated Profile Box to indicate Clickability
    profileBox: {
      display: "flex", alignItems: "center", gap: "12px",
      padding: "6px 15px 6px 6px",
      background: "rgba(255,255,255,0.05)",
      borderRadius: "30px",
      border: "1px solid rgba(255,255,255,0.1)",
      cursor: "pointer",
      position: "relative",
      transition: "0.3s"
    },
    avatar: {
      width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover",
      border: "2px solid #6a00ff", background: "#000",
      opacity: uploading ? 0.5 : 1
    },
    adminName: { fontSize: "0.9rem", fontWeight: "600", color: "#fff" },
    
    // Hidden Input
    hiddenInput: { display: "none" }
  };

  return (
    <header style={styles.header}>
      <div style={styles.titleSection}>
        <span style={{color: "#94a3b8", fontSize: "0.8rem"}}>PAGE</span>
        <h2 style={styles.pageTitle}>{getPageTitle()}</h2>
      </div>

      <div style={styles.rightSection}>
        <button style={styles.iconBtn}>
          <Bell size={18} />
          <span style={styles.badge}></span>
        </button>

        {/* CLICKABLE PROFILE BOX */}
        <div 
          style={styles.profileBox} 
          onClick={() => fileInputRef.current.click()} // Trigger hidden input
          title="Click to change photo"
        >
          <img 
            src={getProfileImage()} 
            alt="Profile" 
            style={styles.avatar}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Admin&background=6a00ff&color=fff"; }} 
          />
          <span style={styles.adminName}>{uploading ? "Uploading..." : user.name}</span>
          
          {/* Optional: Tiny Camera Icon overlay */}
          <div style={{position: 'absolute', bottom: -5, left: 25, background: '#111', borderRadius: '50%', padding: 2}}>
             <Camera size={10} color="#fff"/>
          </div>
        </div>

        {/* HIDDEN FILE INPUT */}
        <input 
          type="file" 
          ref={fileInputRef} 
          style={styles.hiddenInput} 
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </header>
  );
}