import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

// Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CoreValues from "./components/CoreValues";

// Public Pages
import Home from "./pages/Home"; 
import AboutRoutes from "./pages/AboutRoutes"; 
import MissionVision from "./pages/MissionVision";
import Technologies from "./pages/Technologies";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// --- ADMIN PAGES ---
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard"; 

import AdminProjects from "./pages/admin/AdminProjects";
import AdminServices from "./pages/admin/AdminServices";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminMissionVision from "./pages/admin/AdminMissionVision";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminChangePassword from "./pages/admin/AdminChangePassword";
import AdminAboutInfo from "./pages/admin/AdminAboutInfo"; 

import AdminLayout from "./components/admin/AdminLayout";

function AppContent() {
  const { pathname } = useLocation();
  const { theme } = useTheme(); 
  const isDark = theme === "dark";

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  const isAdminRoute = pathname.startsWith("/admin");

  const globalStyles = {
    backgroundColor: isDark ? "#0b0f1a" : "#f4f7fa",
    color: isDark ? "#ffffff" : "#1a1a2e",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  return (
    <div style={globalStyles}>
      {!isAdminRoute && <Nav />}
      
      <main style={{ flex: 1, width: "100%" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutRoutes />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          <Route path="/core-values" element={<CoreValues />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin/login" element={<Login />} />

          {/* ✅ FIXED: Changed path from "/admin" to "/admin/dashboard" */}
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

          {/* Optional: Add a redirect or fallback if user types just "/admin" */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />

          <Route path="/admin/about-info" element={<AdminLayout><AdminAboutInfo /></AdminLayout>} />
          <Route path="/admin/projects" element={<AdminLayout><AdminProjects /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
          <Route path="/admin/team_members" element={<AdminLayout><AdminTeam /></AdminLayout>} />
          <Route path="/admin/mission_vision" element={<AdminLayout><AdminMissionVision /></AdminLayout>} />
          <Route path="/admin/partners" element={<AdminLayout><AdminPartners /></AdminLayout>} />
          <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
          <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
          <Route path="/admin/change-password" element={<AdminLayout><AdminChangePassword /></AdminLayout>} />
          
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router> 
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}