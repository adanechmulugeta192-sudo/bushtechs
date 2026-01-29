import React, { useState, useEffect } from "react";
import { Trash2, Upload, Save, Loader2, Pencil, X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // State for Edit Mode
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const API_BASE = "http://localhost:5000"; 

  // ------------------------------------------
  // 🌙 MODERN DARK THEME STYLES
  // ------------------------------------------

  const pageStyle = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212", // Matte Black
    color: "#e0e0e0",
    fontFamily: "'Inter', sans-serif",
  };

  const contentStyle = {
    flex: 1,
    marginLeft: "260px",
    padding: "40px",
  };

  const formCardStyle = {
    background: "#1e1e1e", // Dark Surface
    padding: "30px",
    borderRadius: "12px",
    marginBottom: "40px",
    border: "1px solid #333",
    borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#2d2d2d",
    color: "#fff",
    outline: "none",
    fontSize: "1rem",
  };

  const uploadBox = {
    border: "2px dashed #555",
    padding: "20px",
    textAlign: "center",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#2d2d2d",
    color: "#aaa",
  };

  const submitBtn = {
    padding: "12px",
    background: editId ? "#facc15" : "#6a00ff",
    color: editId ? "#000" : "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    fontSize: "1rem",
    marginTop: "10px",
    transition: "0.2s",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  };

  const partnerCardStyle = (p) => ({
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    border: editId === p.id ? "1px solid #facc15" : "1px solid #333",
    transition: "0.2s",
  });

  const actionBtn = {
    flex: 1,
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  // ------------------------------------------
  // LOGIC
  // ------------------------------------------

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/partners`);
      const data = await res.json();
      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching partners:", err);
    }
  };

  // --- EDIT LOGIC ---
  const handleEditClick = (partner) => {
    setEditId(partner.id);
    setName(partner.name);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setName("");
    setImage(null);
    const fileInput = document.getElementById("partner-upload");
    if(fileInput) fileInput.value = "";
  };

  // --- SUBMIT (ADD OR UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name) {
      alert("⚠️ Please enter a company name.");
      return;
    }
    // If Adding: Image is required. If Editing: Image is optional.
    if (!editId && !image) {
      alert("⚠️ Please upload a logo image.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) { navigate("/admin/login"); return; }

    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      const url = editId 
        ? `${API_BASE}/api/partners/${editId}` // PUT URL
        : `${API_BASE}/api/partners`;          // POST URL
      
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "x-auth-token": token },
        body: formData
      });

      if (res.ok) {
        alert(editId ? "✅ Partner Updated!" : "✅ Partner Added!");
        handleCancelEdit(); // Reset form
        fetchPartners();    // Refresh list
      } else {
        const errData = await res.json();
        alert(`❌ Failed: ${errData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server Error. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner?")) return;
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(`${API_BASE}/api/partners/${id}`, {
        method: "DELETE",
        headers: { "x-auth-token": token }
      });
      
      if(res.ok) {
        fetchPartners();
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------

  return (
    <div style={pageStyle}>
      <AdminSidebar />
      
      <div style={contentStyle}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", color: "#fff" }}>
          Manage Partners
        </h1>

        {/* FORM CARD */}
        <div style={formCardStyle}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>{editId ? "Edit Partner" : "Add New Partner"}</h3>
            {editId && (
              <button onClick={handleCancelEdit} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                <X size={16} /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            
            <input 
              placeholder="Company Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              style={inputStyle} 
            />

            <div style={uploadBox}>
                <label style={{ cursor: "pointer", display: "block", width: "100%" }}>
                    <Upload size={24} color={image ? "#4ade80" : "#888"} style={{marginBottom: 8}}/> <br/>
                    {image ? (
                      <span style={{color:"#4ade80", fontWeight:"bold"}}>{image.name}</span>
                    ) : (
                      <span style={{color: "#aaa"}}>
                        {editId ? "Upload New Logo (Optional)" : "Click to Upload Logo (Required)"}
                      </span>
                    )}
                    
                    <input 
                      id="partner-upload"
                      type="file" 
                      hidden 
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])} 
                    />
                </label>
            </div>

            <button type="submit" disabled={loading} style={submitBtn}>
               {loading ? <Loader2 className="animate-spin" /> : (editId ? <CheckCircle size={18}/> : <Save size={18}/>)}
               {loading ? "Processing..." : (editId ? "Update Partner" : "Save Partner")}
            </button>
          </form>
        </div>

        {/* LIST CARD */}
        <div style={gridStyle}>
          {partners.map((p) => (
            <div key={p.id} style={partnerCardStyle(p)}>
                <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", background: "#333", borderRadius: "8px", padding: "10px" }}>
                  <img 
                    src={`${API_BASE}${p.logo}`} 
                    alt={p.name} 
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} 
                  />
                </div>
                <div style={{ fontWeight: "bold", color: "#fff", marginBottom: "15px" }}>{p.name}</div>
                
                <div style={{ display: "flex", gap: "10px" }}>
                  {/* EDIT BUTTON */}
                  <button 
                    onClick={() => handleEditClick(p)} 
                    style={{ ...actionBtn, background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}
                  >
                      <Pencil size={16} /> Edit
                  </button>

                  {/* DELETE BUTTON */}
                  <button 
                    onClick={() => handleDelete(p.id)} 
                    style={{ ...actionBtn, background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
                  >
                      <Trash2 size={16} /> Delete
                  </button>
                </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}