import React, { useEffect, useState } from "react";
import { LayoutGrid, Users, MessageSquare, Briefcase, ArrowUpRight, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate

const API_BASE = "http://localhost:5000";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ projects: 0, services: 0, team: 0, messages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ 1. GET TOKEN
      const token = localStorage.getItem("token");
      
      // If no token, we can't fetch private messages, but we can try public data
      const authHeaders = token ? { "Authorization": token } : {};

      // ✅ 2. FETCH MESSAGES (NEEDS TOKEN)
      const resMsg = await fetch(`${API_BASE}/api/admin/contact-submissions`, {
        headers: authHeaders 
      });
      
      let msgs = [];
      if (resMsg.ok) {
        msgs = await resMsg.json();
      } else if (resMsg.status === 401) {
        // Optional: Redirect if session expired, or just show 0
        console.warn("Unauthorized to fetch messages");
      }

      // 3. Fetch Public Data (Projects, Team, Services usually don't need token for GET)
      const resProj = await fetch(`${API_BASE}/api/projects`);
      const projs = await resProj.json();

      const resTeam = await fetch(`${API_BASE}/api/team`);
      const team = await resTeam.json();

      const resServ = await fetch(`${API_BASE}/api/services`);
      const serv = await resServ.json();

      // 4. Update State
      setCounts({
        messages: Array.isArray(msgs) ? msgs.length : 0,
        projects: Array.isArray(projs) ? projs.length : 0,
        team: Array.isArray(team) ? team.length : 0,
        services: Array.isArray(serv) ? serv.length : 0
      });

      // Get last 3 messages for the table
      if (Array.isArray(msgs)) {
        // Sort by ID or Date if not already sorted by backend
        const sortedMsgs = msgs.slice(0, 3); 
        setRecentMessages(sortedMsgs);
      }

    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  };

  // Stats Configuration
  const stats = [
    { title: "Total Projects", value: counts.projects, icon: <LayoutGrid size={24} />, color: "#00d2ff", bg: "rgba(0, 210, 255, 0.15)" },
    { title: "Active Services", value: counts.services, icon: <Briefcase size={24} />, color: "#d900ff", bg: "rgba(217, 0, 255, 0.15)" },
    { title: "Team Members", value: counts.team, icon: <Users size={24} />, color: "#ff9100", bg: "rgba(255, 145, 0, 0.15)" },
    { title: "Inquiries", value: counts.messages, icon: <MessageSquare size={24} />, color: "#00ff9d", bg: "rgba(0, 255, 157, 0.15)" },
  ];

  // --- STYLES ---
  const styles = {
    container: { fontFamily: "'Inter', sans-serif", color: "#fff", maxWidth: "1200px", margin: "0 auto" },
    
    welcomeSection: { marginBottom: "40px" },
    title: { fontSize: "2.5rem", fontWeight: "800", margin: 0, background: "linear-gradient(90deg, #fff, #a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtitle: { color: "#94a3b8", marginTop: "10px", fontSize: "1.1rem" },

    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px", marginBottom: "50px" },
    
    card: {
      background: "rgba(30, 30, 45, 0.6)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "20px", padding: "25px",
      display: "flex", flexDirection: "column", gap: "15px", position: "relative", overflow: "hidden",
      transition: "0.3s"
    },
    
    iconBox: (color, bg) => ({
      width: "50px", height: "50px", borderRadius: "12px", background: bg, color: color,
      display: "flex", alignItems: "center", justifyContent: "center"
    }),

    statValue: { fontSize: "2.5rem", fontWeight: "700", color: "#fff", lineHeight: 1 },
    statTitle: { color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" },
    glow: (color) => ({
      position: "absolute", top: "-50px", right: "-50px", width: "100px", height: "100px",
      background: color, filter: "blur(60px)", opacity: 0.4, borderRadius: "50%"
    }),

    sectionTitle: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
    tableContainer: {
      background: "rgba(30, 30, 45, 0.6)", backdropFilter: "blur(12px)",
      borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.05)", overflow: "hidden", padding: "10px"
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { textAlign: "left", padding: "20px", color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase" },
    td: { padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.03)", color: "#cbd5e1" },
    
    viewAllBtn: {
      color: "#00d2ff", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600",
      display: "flex", alignItems: "center", gap: "5px", marginLeft: "auto", width: "fit-content"
    }
  };

  return (
    <div style={styles.container}>
      
      {/* 1. WELCOME */}
      <div style={styles.welcomeSection}>
        <h1 style={styles.title}>Dashboard Overview</h1>
        <p style={styles.subtitle}>Welcome back, Admin. Here is what's happening today.</p>
      </div>

      {/* 2. STATS CARDS */}
      <div style={styles.grid}>
        {stats.map((stat, i) => (
          <div key={i} style={styles.card} className="hover-card">
            <div style={styles.glow(stat.color)}></div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div style={styles.iconBox(stat.color, stat.bg)}>{stat.icon}</div>
              <ArrowUpRight size={20} color="rgba(255,255,255,0.2)" />
            </div>
            <div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statTitle}>{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. RECENT INQUIRIES TABLE */}
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
           <h2 style={styles.sectionTitle}><TrendingUp size={24} color="#d900ff" /> Recent Inquiries</h2>
           <Link to="/admin/messages" style={styles.viewAllBtn}>View All Messages <ArrowUpRight size={16}/></Link>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Client Name</th>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td style={styles.td}>
                      <strong>{msg.name}</strong><br/>
                      <span style={{fontSize: '0.8rem', color: '#64748b'}}>{msg.email}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={{color: '#00d2ff', background: 'rgba(0, 210, 255, 0.1)', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', border: '1px solid rgba(0, 210, 255, 0.2)'}}>
                        {msg.service || "General"}
                      </span>
                    </td>
                    <td style={styles.td}>{new Date(msg.created_at).toLocaleDateString()}</td>
                    <td style={styles.td}><span style={{color: '#00ff9d'}}>New</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" style={{padding: "20px", textAlign: "center", color: "#64748b"}}>No recent messages found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .hover-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2) !important; box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
      `}</style>
    </div>
  );
}