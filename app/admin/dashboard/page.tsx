"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Project { _id?: string; title: string; category: string; image: string; link: string; stats: { likes: string; views: string }; order: number; }
interface Video { _id?: string; title: string; description: string; thumbnail: string; videoUrl: string; category: string; order: number; }
interface Education { _id?: string; degree: string; short: string; year: string; status?: string; statusType: 'done' | 'current' | 'future'; icon: string; schoolName: string; schoolShort: string; location: string; order: number; }
interface Gear { _id?: string; name: string; subtitle: string; description: string; icon: string; tags: string[]; order: number; }
interface Feedback { _id?: string; name: string; role: string; brand: string; text: string; avatar: string; metric: string; order: number; }
interface Skill { _id?: string; categoryTitle: string; icon: string; skills: string[]; order: number; }
interface Settings { _id?: string; heroTitle: string; heroSubTitle: string; heroDescription: string; stats: { label: string; value: string }[]; contactEmail: string; contactPhone: string; contactAddress: string; }

const emptyProject: Project = { title: "", category: "", image: "", link: "", stats: { likes: "0", views: "0" }, order: 0 };
const emptyVideo: Video = { title: "", description: "", thumbnail: "", videoUrl: "", category: "General", order: 0 };
const emptyEducation: Education = { degree: "", short: "", year: "", status: "", statusType: "done", icon: "graduation", schoolName: "", schoolShort: "", location: "", order: 0 };
const emptyGear: Gear = { name: "", subtitle: "", description: "", icon: "iphone", tags: [], order: 0 };
const emptyFeedback: Feedback = { name: "", role: "", brand: "", text: "", avatar: "", metric: "", order: 0 };
const emptySkill: Skill = { categoryTitle: "", icon: "strategy", skills: [], order: 0 };
const emptySettings: Settings = { heroTitle: "", heroSubTitle: "", heroDescription: "", stats: [], contactEmail: "", contactPhone: "", contactAddress: "" };

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"projects" | "videos" | "education" | "gear" | "feedback" | "skills" | "settings">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [gear, setGear] = useState<Gear[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [settings, setSettings] = useState<Settings>(emptySettings);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>(emptyProject);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  function getToken() {
    return typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  }

  function authHeaders() {
    return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    setMsg("");
    try {
      const urls = ["/api/projects", "/api/videos", "/api/education", "/api/gear", "/api/feedback", "/api/skills", "/api/settings"];
      const responses = await Promise.all(urls.map(u => fetch(u)));
      const data = await Promise.all(responses.map(r => r.json()));

      setProjects(Array.isArray(data[0]) ? data[0] : []);
      setVideos(Array.isArray(data[1]) ? data[1] : []);
      setEducation(Array.isArray(data[2]) ? data[2] : []);
      setGear(Array.isArray(data[3]) ? data[3] : []);
      setFeedback(Array.isArray(data[4]) ? data[4] : []);
      setSkills(Array.isArray(data[5]) ? data[5] : []);
      if (data[6] && !data[6].error) setSettings(data[6]);
      
    } catch (err) {
      setMsg("Connection error: Failed to reach the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push("/admin"); return; }
    fetchData();
  }, [fetchData, router]);

  function logout() {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  }

  function openAdd() {
    setEditItem(null);
    if (tab === "projects") setFormData({ ...emptyProject });
    else if (tab === "videos") setFormData({ ...emptyVideo });
    else if (tab === "education") setFormData({ ...emptyEducation });
    else if (tab === "gear") setFormData({ ...emptyGear });
    else if (tab === "feedback") setFormData({ ...emptyFeedback });
    else if (tab === "skills") setFormData({ ...emptySkill });
    else if (tab === "settings") setFormData({ ...settings });
    setShowForm(true);
  }

  function openEdit(item: Project | Video) {
    setEditItem(item);
    setFormData({ ...item });
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    setMsg("");
    const base = `/api/${tab}`;
    const id = editItem?._id;

    try {
      const res = await fetch(id ? `${base}/${id}` : base, {
        method: id ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMsg("Saved successfully!");
        setShowForm(false);
        fetchData();
      } else {
        const d = await res.json();
        setMsg(d.error || "Error saving");
      }
    } catch {
      setMsg("Error: Could not connect to the server.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    const base = `/api/${tab}`;
    await fetch(`${base}/${id}`, { method: "DELETE", headers: authHeaders() });
    fetchData();
  }

  const getItems = () => {
    if (tab === "projects") return projects;
    if (tab === "videos") return videos;
    if (tab === "education") return education;
    if (tab === "gear") return gear;
    if (tab === "feedback") return feedback;
    if (tab === "skills") return skills;
    return [];
  };

  const items = getItems();

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem 0.9rem", border: "1.5px solid #d1c1b1", borderRadius: 8,
    fontSize: "0.9rem", fontFamily: "inherit", width: "100%", boxSizing: "border-box",
    outline: "none", background: "#faf7f3"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5efe6", fontFamily: "var(--font-sans, sans-serif)" }}>
      {/* Navbar */}
      <header style={{
        background: "white", padding: "1rem 2rem", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        boxShadow: "0 2px 12px rgba(45,35,29,0.07)", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#b07d62", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>A</div>
          <span style={{ fontFamily: "var(--font-serif, serif)", fontWeight: 700, fontSize: "1.1rem" }}>Admin Panel</span>
        </div>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <a href="/" target="_blank" style={{ fontSize: "0.82rem", color: "#b07d62", textDecoration: "none", fontWeight: 600 }}>← View Site</a>
          <button onClick={logout} style={{ padding: "0.5rem 1.2rem", background: "#2d231d", color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: "0.82rem", fontWeight: 700 }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {(["projects", "videos", "education", "gear", "feedback", "skills", "settings"] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setShowForm(false); }} style={{
              padding: "0.6rem 1.4rem", borderRadius: 100, border: "none", cursor: "pointer",
              background: tab === t ? "#b07d62" : "white", color: tab === t ? "white" : "#2d231d",
              fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase",
              boxShadow: "0 2px 8px rgba(45,35,29,0.08)", flexShrink: 0
            }}>{t}</button>
          ))}
        </div>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-serif, serif)", fontSize: "1.5rem", textTransform: "capitalize" }}>
            {tab} <span style={{ color: "#b07d62", fontSize: "1rem" }}>{tab !== 'settings' ? `(${items.length})` : ''}</span>
          </h2>
          {tab !== 'settings' && (
            <button onClick={openAdd} style={{
              padding: "0.7rem 1.6rem", background: "#b07d62", color: "white", border: "none",
              borderRadius: 100, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", letterSpacing: "0.08em"
            }}>+ Add New</button>
          )}
          {tab === 'settings' && (
            <button onClick={handleSave} disabled={saving} style={{
              padding: "0.7rem 1.6rem", background: "#2d231d", color: "white", border: "none",
              borderRadius: 100, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", letterSpacing: "0.08em"
            }}>{saving ? "Saving..." : "Save Settings"}</button>
          )}
        </div>

        {msg && <div style={{ padding: "0.75rem 1rem", background: msg.includes("success") ? "#d4edda" : "#f8d7da", borderRadius: 8, marginBottom: "1rem", fontSize: "0.88rem" }}>{msg}</div>}

        {/* Database Diagnostic Tool */}
        {!loading && msg.includes("Failed to fetch") && (
          <div style={{ 
            background: "#fff9f2", border: "1.5px solid #d1c1b1", borderRadius: 12, 
            padding: "1.2rem", marginBottom: "1.5rem", boxShadow: "0 4px 15px rgba(176,125,98,0.1)"
          }}>
            <h4 style={{ margin: "0 0 0.6rem", color: "#b07d62", fontSize: "1rem", fontFamily: "var(--font-serif, serif)" }}>🔍 Connection Diagnostic Tool</h4>
            <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "#6d5a4d" }}>
              It looks like your database is not accessible. This is usually caused by an IP whitelisting issue in MongoDB Atlas.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <div style={{ background: "white", padding: "0.5rem 1rem", borderRadius: 8, border: "1px solid #d1c1b1", fontSize: "0.85rem" }}>
                <span style={{ fontWeight: 600 }}>Your Public IP:</span> <code style={{ color: "#b07d62", fontSize: "0.95rem" }}>112.140.191.92</code>
              </div>
              <button 
                onClick={async () => {
                  setMsg("Testing connection...");
                  const res = await fetch("/api/admin/test-db");
                  const data = await res.json();
                  if (data.status === "SUCCESS") {
                    setMsg("✅ Success! Database connected. Refreshing...");
                    fetchData();
                  } else {
                    setMsg(`❌ ${data.type || "Error"}: ${data.message}`);
                  }
                }}
                style={{ 
                  padding: "0.6rem 1.2rem", background: "#b07d62", color: "white", border: "none", 
                  borderRadius: 100, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer"
                }}
              >
                Test Connection
              </button>
            </div>
            <p style={{ marginTop: "0.8rem", fontSize: "0.75rem", color: "#9c8c7d", fontStyle: "italic" }}>
              Instructions: Copy the IP above, go to <b>MongoDB Atlas &gt; Network Access</b>, and add it to your IP Access List.
            </p>
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div style={{ background: "white", borderRadius: 16, padding: "1.8rem", marginBottom: "1.5rem", boxShadow: "0 8px 30px rgba(45,35,29,0.08)" }}>
            <h3 style={{ margin: "0 0 1.2rem", fontFamily: "var(--font-serif, serif)", color: "#b07d62", textTransform: "capitalize" }}>
              {editItem ? "Edit" : "Add New"} {tab}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {tab === "projects" && <>
                <input style={inputStyle} placeholder="Display Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                <input style={inputStyle} placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                <input style={inputStyle} placeholder="Reel URL" value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                <input style={inputStyle} placeholder="Thumbnail URL" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                <input style={inputStyle} placeholder="Likes (e.g. 15k)" value={formData.stats?.likes} onChange={e => setFormData({ ...formData, stats: { ...formData.stats, likes: e.target.value } })} />
                <input style={inputStyle} placeholder="Views (e.g. 300k)" value={formData.stats?.views} onChange={e => setFormData({ ...formData, stats: { ...formData.stats, views: e.target.value } })} />
              </>}
              
              {tab === "videos" && <>
                <input style={inputStyle} placeholder="Video Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                <input style={inputStyle} placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                <input style={inputStyle} placeholder="Video URL" value={formData.videoUrl} onChange={e => setFormData({ ...formData, videoUrl: e.target.value })} />
                <input style={inputStyle} placeholder="Thumbnail URL" value={formData.thumbnail} onChange={e => setFormData({ ...formData, thumbnail: e.target.value })} />
                <textarea style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </>}

              {tab === "education" && <>
                <input style={inputStyle} placeholder="Degree Name" value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} />
                <input style={inputStyle} placeholder="Short Code (e.g. MSIT)" value={formData.short} onChange={e => setFormData({ ...formData, short: e.target.value })} />
                <input style={inputStyle} placeholder="School Name" value={formData.schoolName} onChange={e => setFormData({ ...formData, schoolName: e.target.value })} />
                <input style={inputStyle} placeholder="School Short (e.g. MKBU)" value={formData.schoolShort} onChange={e => setFormData({ ...formData, schoolShort: e.target.value })} />
                <input style={inputStyle} placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                <input style={inputStyle} placeholder="Year (e.g. 2021-2023)" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
              </>}

              {tab === "gear" && <>
                <input style={inputStyle} placeholder="Gear Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input style={inputStyle} placeholder="Subtitle" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                <input style={inputStyle} placeholder="Icon Name (e.g. iphone)" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                <textarea style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
              </>}

              {tab === "feedback" && <>
                <input style={inputStyle} placeholder="Client Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input style={inputStyle} placeholder="Role" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                <input style={inputStyle} placeholder="Brand Name" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} />
                <input style={inputStyle} placeholder="Metric (e.g. +40% growth)" value={formData.metric} onChange={e => setFormData({ ...formData, metric: e.target.value })} />
                <textarea style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Feedback Text" value={formData.text} onChange={e => setFormData({ ...formData, text: e.target.value })} />
              </>}

              {tab === "skills" && <>
                <input style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Category Title" value={formData.categoryTitle} onChange={e => setFormData({ ...formData, categoryTitle: e.target.value })} />
                <input style={inputStyle} placeholder="Icon Name" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                <input style={inputStyle} placeholder="Skills (comma separated)" value={formData.skills?.join(', ')} onChange={e => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })} />
              </>}

              {tab === "settings" && <>
                <input style={inputStyle} placeholder="Hero Title" value={formData.heroTitle} onChange={e => setFormData({ ...formData, heroTitle: e.target.value })} />
                <input style={inputStyle} placeholder="Hero Subtitle" value={formData.heroSubTitle} onChange={e => setFormData({ ...formData, heroSubTitle: e.target.value })} />
                <textarea style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Hero Description" value={formData.heroDescription} onChange={e => setFormData({ ...formData, heroDescription: e.target.value })} />
                <input style={inputStyle} placeholder="Phone" value={formData.contactPhone} onChange={e => setFormData({ ...formData, contactPhone: e.target.value })} />
                <input style={inputStyle} placeholder="Email" value={formData.contactEmail} onChange={e => setFormData({ ...formData, contactEmail: e.target.value })} />
                <input style={{ ...inputStyle, gridColumn: "1 / -1" }} placeholder="Address" value={formData.contactAddress} onChange={e => setFormData({ ...formData, contactAddress: e.target.value })} />
              </>}

              {tab !== "settings" && <input style={inputStyle} type="number" placeholder="Order" value={formData.order} onChange={e => setFormData({ ...formData, order: Number(e.target.value) })} />}
            </div>
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem" }}>
              <button onClick={handleSave} disabled={saving} style={{ padding: "0.8rem 2.5rem", background: "#2d231d", color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>{saving ? "Saving..." : "Save Now"}</button>
              <button onClick={() => setShowForm(false)} style={{ padding: "0.8rem 1.8rem", background: "transparent", border: "1.5px solid #d1c1b1", borderRadius: 10, cursor: "pointer", fontSize: "0.9rem", fontWeight: 600 }}>Cancel</button>
            </div>
          </div>
        )}

        {/* List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#b07d62" }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", color: "#6d5a4d", background: "white", borderRadius: 16 }}>No items yet. Click "+ Add New" to start.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {tab === "settings" ? (
              <div style={{ background: "white", borderRadius: 16, padding: "2rem", textAlign: "center", color: "#6d5a4d" }}>
                <p style={{ margin: 0, fontWeight: 600 }}>Global Settings are managed via the Save button at the top.</p>
                <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Updates Hero Title, Description, and Contact Info across the site.</p>
              </div>
            ) : items.map((item: any) => {
              const displayTitle = item.title || item.name || item.degree || item.categoryTitle || "Untitled";
              const displaySub = item.category || item.schoolName || item.subtitle || item.role || (item.skills ? item.skills.join(', ') : "");
              const displayImg = item.image || item.thumbnail || item.avatar;

              return (
                <div key={item._id} style={{
                  background: "white", borderRadius: 12, padding: "1rem 1.4rem",
                  display: "flex", alignItems: "center", gap: "1rem",
                  boxShadow: "0 2px 10px rgba(45,35,29,0.06)"
                }}>
                  {displayImg && (
                    <img src={displayImg} alt="" style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8, flexShrink: 0, background: "#f5efe6" }} />
                  ) || (
                    <div style={{ width: 50, height: 50, borderRadius: 8, background: "#f5efe6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                      {item.icon ? "✨" : "📄"}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayTitle}</p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "#b07d62", textTransform: "uppercase", letterSpacing: "0.1em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displaySub}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => openEdit(item)} style={{ padding: "0.45rem 1rem", border: "1.5px solid #d1c1b1", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem", background: "transparent", fontWeight: 600 }}>Edit</button>
                    <button onClick={() => handleDelete(item._id!)} style={{ padding: "0.45rem 1rem", border: "none", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem", background: "#fee2e2", color: "#c53030", fontWeight: 600 }}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
