import React, { useState, useEffect } from "react";
import { Trash2, Upload, Save, Quote, Loader2, Pencil, X, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

// ✅ DYNAMIC API CONFIGURATION
const API_BASE = window.location.hostname === "localhost" 
  ? "http://localhost:5000" 
  : "https://bushtechs-backend-f03g.onrender.com";

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ author: "", company: "", text: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // --- STYLES ---
  const pageStyle = { display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0c", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" };
  const contentStyle = { flex: 1, marginLeft: "260px", padding: "40px" };
  const formCardStyle = { background: "#16161a", padding: "30px", borderRadius: "16px", marginBottom: "30px", border: "1px solid #222", borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" };
  const listItemStyle = (id) => ({ background: "#16161a", padding: "20px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #222", borderLeft: editId === id ? "4px solid #facc15" : "1px solid #222", transition: "0.2s", marginBottom: "12px" });
  const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#000", color: "#fff", outline: "none" };
  const uploadBox = { border: "2px dashed #333", padding: "15px", borderRadius: "8px", background: "#000", textAlign: "center", color: "#888" };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  const handleEditClick = (item) => {
    setEditId(item._id || item.id);
    setForm({ author: item.author, company: item.company || "", text: item.text });
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ author: "", company: "", text: "" });
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("author", form.author);
    formData.append("company", form.company);
    formData.append("text", form.text);
    if(image) formData.append("image", image);

    try {
      const url = editId 
        ? `${API_BASE}/api/admin/testimonials/${editId}` 
        : `${API_BASE}/api/admin/testimonials`;
      
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Authorization": `Bearer ${token}` }, // ✅ Standard Auth
        body: formData
      });

      if (res.ok) {
        handleCancelEdit();
        fetchItems();
      } else {
        alert("Action failed. Ensure you are authorized.");
      }
    } catch(err) { alert("Network Error"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete testimonial permanently?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/admin/testimonials/${id}`, { 
        method: "DELETE", 
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch (err) { console.error(err); }
  };

  return (
    <div style={pageStyle}>
      <AdminSidebar />
      <div style={contentStyle}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "30px", color: "#fff", letterSpacing: "-1px" }}>
          Client <span style={{color: "#6a00ff"}}>Vouch</span>
        </h1>
        
        {/* FORM */}
        <div style={formCardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>{editId ? "Update Review" : "Add New Review"}</h3>
            {editId && (
              <button onClick={handleCancelEdit} style={{background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5, color: "#f87171", fontWeight: "bold"}}>
                <X size={16}/> Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"15px"}}>
                <input placeholder="Client Name" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} required style={inputStyle} />
                <input placeholder="Role / Designation" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} required style={inputStyle} />
            </div>
            <textarea placeholder="The testimonial content..." rows="3" value={form.text} onChange={e=>setForm({...form, text:e.target.value})} required style={{...inputStyle, resize: "vertical"}} />
            
            <div style={uploadBox}>
                <label style={{cursor:"pointer", display:"block", width: "100%"}}>
                    <Upload size={20} style={{marginBottom:5, color: image ? "#d900ff" : "#444"}} /> <br/>
                    <span style={{fontSize:"0.85rem", fontWeight: image ? "bold" : "normal", color: image ? "#fff" : "#888"}}>
                      {image ? image.name : (editId ? "Replace Photo (Optional)" : "Client Avatar (JPG/PNG)")}
                    </span>
                    <input type="file" hidden onChange={e=>setImage(e.target.files[0])} accept="image/*" />
                </label>
            </div>

            <button type="submit" disabled={loading} style={{ padding: "14px", border: "none", borderRadius: "10px", fontWeight: "800", cursor: loading ? "not-allowed" : "pointer", background: editId ? "#facc15" : "linear-gradient(90deg, #6a00ff, #d900ff)", color: editId ? "#000" : "#fff", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {loading ? <Loader2 className="animate-spin" size={20}/> : (editId ? <CheckCircle2 size={18}/> : <Save size={18}/>)}
                {loading ? "Syncing..." : (editId ? "Confirm Update" : "Publish Testimonial")}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div style={{display:"grid", gap:"12px"}}>
            {items.map(t => (
                <div key={t._id || t.id} style={listItemStyle(t._id || t.id)}>
                    <div style={{display:"flex", gap:"15px", alignItems:"center"}}>
                        <div style={{width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "2px solid #222", background: "#111"}}>
                          {t.image ? (
                            <img src={`${API_BASE}/${t.image}`} alt={t.author} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                          ) : (
                            <div style={{width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color: "#333"}}>
                              <Quote size={24}/>
                            </div>
                          )}
                        </div>
                        <div>
                            <strong style={{ color: "#fff", fontSize: "1.1rem" }}>{t.author}</strong> 
                            <div style={{color:"#666", fontSize:"0.85rem", fontWeight: "600"}}>{t.company}</div>
                            <p style={{margin:"8px 0 0", color:"#aaa", fontStyle:"italic", fontSize:"0.9rem", maxWidth: "500px"}}>
                              "{t.text.length > 100 ? t.text.substring(0, 100) + "..." : t.text}"
                            </p>
                        </div>
                    </div>
                    <div style={{display:"flex", gap:"10px"}}>
                        <button onClick={()=>handleEditClick(t)} style={{ background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.2)", padding: "8px", borderRadius: "8px", cursor: "pointer" }}><Pencil size={18}/></button>
                        <button onClick={()=>handleDelete(t._id || t.id)} style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "8px", borderRadius: "8px", cursor: "pointer" }}><Trash2 size={18}/></button>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <style>{`.animate-spin { animation: spin 1s linear infinite; } @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
