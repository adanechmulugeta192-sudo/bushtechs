import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutGrid, Briefcase, Users, Target, LogOut, Quote, Mail, Lock, Info, Home } from "lucide-react";

// ✅ 1. IMPORT YOUR LOGO HERE
import logo from "../../assets/favicon.png";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin/login");
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "About Info", path: "/admin/about-info", icon: <Info size={20} /> },
    { name: "Projects", path: "/admin/projects", icon: <LayoutGrid size={20} /> },
    { name: "Services", path: "/admin/services", icon: <Briefcase size={20} /> },
    { name: "Team", path: "/admin/team_members", icon: <Users size={20} /> },
    { name: "Mission", path: "/admin/mission_vision", icon: <Target size={20} /> },
    { name: "Partners", path: "/admin/partners", icon: <Users size={20} /> },
    { name: "Testimonials", path: "/admin/testimonials", icon: <Quote size={20} /> },
    { name: "Messages", path: "/admin/messages", icon: <Mail size={20} /> },
    { name: "Password", path: "/admin/change-password", icon: <Lock size={20} /> }, 
  ];

  return (
    <div className="admin-sidebar">
      
      {/* ✅ 2. LOGO AREA - NOW CLICKABLE & USES IMAGE */}
      {/* Changed <div> to <Link> to make it navigate to Dashboard */}
      <Link to="/admin" className="sidebar-header">
        <div className="logo-icon">
          {/* Using your favicon.png instead of the Layers icon */}
          <img 
            src={logo} 
            alt="BushTechs" 
            style={{ width: "24px", height: "24px", objectFit: "contain" }} 
          />
        </div>
        <div className="logo-text">
          <h2>BushTechs</h2>
          <span>Admin Panel</span>
        </div>
      </Link>

      {/* NAVIGATION */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`sidebar-link ${currentPath === item.path ? "active" : ""}`}
          >
            <span className="link-icon">{item.icon}</span>
            <span className="link-text">{item.name}</span>
            {currentPath === item.path && <div className="active-glow" />}
          </Link>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* --- SIDEBAR SPECIFIC CSS --- */}
      <style>{`
        .admin-sidebar {
          width: 260px;
          height: 100vh;
          background: var(--admin-sidebar, #0f1015); 
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          position: fixed;
          top: 0; left: 0;
          display: flex;
          flex-direction: column;
          z-index: 100;
          padding: 20px;
          color: #fff;
        }

        /* Header is now a Link, need to remove text decoration */
        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 30px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          text-decoration: none; /* Removes underline from Link */
          cursor: pointer;
        }

        .logo-icon {
          width: 40px; height: 40px;
          background: linear-gradient(90deg, #6a00ff, #d900ff);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 15px rgba(106, 0, 255, 0.4);
        }

        .logo-text h2 { 
          font-family: 'Orbitron', sans-serif; 
          font-size: 1.1rem; 
          color: var(--admin-text, #ffffff);
          margin: 0; 
        }
        
        .logo-text span { 
          font-size: 0.75rem; 
          color: var(--admin-text-muted, #9ca3af);
          text-transform: uppercase; 
          letter-spacing: 1px; 
        }

        .sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 8px; overflow-y: auto; }

        .sidebar-link {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--admin-text-muted, #9ca3af);
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          transform: translateX(5px);
        }

        .sidebar-link.active {
          background: rgba(106, 0, 255, 0.15);
          color: #ffffff;
          font-weight: 600;
        }

        .link-icon { display: flex; align-items: center; justify-content: center; }
        
        .active-glow {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 4px;
          background: #6a00ff;
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px #6a00ff;
        }

        .sidebar-footer { 
          padding-top: 20px; 
          border-top: 1px solid rgba(255, 255, 255, 0.1); 
        }

        .logout-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 12px;
          background: transparent;
          border: 1px solid rgba(255, 77, 77, 0.2);
          color: #ff4d4d;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: rgba(255, 77, 77, 0.1);
          border-color: #ff4d4d;
        }
      `}</style>
    </div>
  );
}