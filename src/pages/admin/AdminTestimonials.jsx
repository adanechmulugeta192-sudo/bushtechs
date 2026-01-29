import React, { useState, useEffect } from "react";
import { Trash2, Upload, Save, Quote, Loader2, Pencil, X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ author: "", company: "", text: "" });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Edit State
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
    marginBottom: "30px",
    border: "1px solid #333",
    borderTop: editId ? "4px solid #facc15" : "4px solid #6a00ff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
  };

  const listItemStyle = (id) => ({
    background: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #333",
    borderLeft: editId === id ? "4px solid #facc15" : "1px solid #333",
    transition: "0.2s",
  });

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
    padding: "15px",
    borderRadius: "8px",
    background: "#2d2d2d",
    textAlign: "center",
    color: "#aaa",
  };

  const btnStyle = {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
    transition: "0.2s",
  };

  const actionBtn = {
    padding: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // ------------------------------------------
  // LOGIC
  // ------------------------------------------

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/testimonials`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
  };

  // --- EDIT ACTIONS ---
  const handleEditClick = (item) => {
    setEditId(item.id);
    setForm({ author: item.author, company: item.company || "", text: item.text });
    setImage(null); // Reset image input (optional during edit)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ author: "", company: "", text: "" });
    setImage(null);
    const fileInput = document.getElementById("t-upload");
    if(fileInput) fileInput.value = "";
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    if(!token) { navigate("/admin/login"); return; }

    const formData = new FormData();
    formData.append("author", form.author);
    formData.append("company", form.company);
    formData.append("text", form.text);
    if(image) formData.append("image", image);

    try {
      const url = editId 
        ? `${API_BASE}/api/testimonials/${editId}` 
        : `${API_BASE}/api/testimonials`;
      
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "x-auth-token": token },
        body: formData
      });

      if (res.ok) {
        alert(editId ? "Updated!" : "Added!");
        handleCancelEdit();
        fetchItems();
      } else {
        alert("Failed.");
      }
    } catch(err) { alert("Error"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete?")) return;
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}/api/testimonials/${id}`, { method: "DELETE", headers: { "x-auth-token": token }});
    fetchItems();
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------

  return (
    <div style={pageStyle}>
      <AdminSidebar />
      <div style={contentStyle}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", color: "#fff" }}>Manage Testimonials</h1>
        
        {/* FORM */}
        <div style={formCardStyle}>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h3 style={{ color: "#fff", margin: 0 }}>{editId ? "Edit Testimonial" : "Add Testimonial"}</h3>
            {editId && (
                <button onClick={handleCancelEdit} style={{background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5, color: "#aaa"}}>
                    <X size={16}/> Cancel
                </button>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"15px"}}>
                <input placeholder="Author Name" value={form.author} onChange={e=>setForm({...form, author:e.target.value})} required style={inputStyle} />
                <input placeholder="Company / Role" value={form.company} onChange={e=>setForm({...form, company:e.target.value})} required style={inputStyle} />
            </div>
            <textarea placeholder="Testimonial Text" rows="3" value={form.text} onChange={e=>setForm({...form, text:e.target.value})} required style={inputStyle} />
            
            <div style={uploadBox}>
                <label style={{cursor:"pointer", display:"block", width: "100%"}}>
                    <Upload size={20} style={{marginBottom:5, color: image ? "#4ade80" : "#aaa"}} /> <br/>
                    <span style={{fontSize:"0.9rem", color: image ? "#4ade80" : "#aaa"}}>
                      {image ? image.name : (editId ? "Upload New Photo (Optional)" : "Upload Client Photo")}
                    </span>
                    <input id="t-upload" type="file" hidden onChange={e=>setImage(e.target.files[0])} />
                </label>
            </div>

            <button type="submit" disabled={loading} style={{ ...btnStyle, background: editId ? "#facc15" : "#6a00ff", color: editId ? "#000" : "#fff" }}>
                {loading ? <Loader2 className="animate-spin"/> : (editId ? "Update Testimonial" : "Save Testimonial")}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div style={{display:"grid", gap:"15px"}}>
            {items.map(t => (
                <div key={t.id} style={listItemStyle(t.id)}>
                    <div style={{display:"flex", gap:"15px", alignItems:"center"}}>
                        {t.image ? (
                          <img src={`${API_BASE}${t.image}`} alt={t.author} style={{width:50, height:50, borderRadius:"50%", objectFit:"cover"}} />
                        ) : (
                          <div style={{width:50, height:50, background:"#333", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color: "#666"}}>
                            <Quote size={20}/>
                          </div>
                        )}
                        <div>
                            <strong style={{ color: "#fff" }}>{t.author}</strong> <span style={{color:"#888", fontSize:"0.9rem"}}> - {t.company}</span>
                            <p style={{margin:"5px 0 0", color:"#aaa", fontStyle:"italic", fontSize:"0.9rem"}}>"{t.text.substring(0, 80)}..."</p>
                        </div>
                    </div>
                    <div style={{display:"flex", gap:"10px"}}>
                        <button onClick={()=>handleEditClick(t)} style={{...actionBtn, color:"#60a5fa", background:"rgba(59, 130, 246, 0.15)"}}><Pencil size={18}/></button>
                        <button onClick={()=>handleDelete(t.id)} style={{...actionBtn, color:"#f87171", background:"rgba(239, 68, 68, 0.15)"}}><Trash2 size={18}/></button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}