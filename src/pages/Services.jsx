// src/pages/Services.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Code2,
  Smartphone,
  PenTool,
  Coffee,
  GitBranch,
  Cpu,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // 1. Import Hook

const SERVICES = [
  {
    id: "web",
    title: "Web Development",
    subtitle:
      "High-performance, modern, responsive websites tailored to your business. We build SEO-optimized, scalable and secure full-stack systems.",
    icons: [
      { Icon: Code2, label: "Frontend" },
      { Icon: Code2, label: "Backend" },
      { Icon: GitBranch, label: "APIs" },
      { Icon: Code2, label: "E-commerce" },
      { Icon: Code2, label: "Performance" },
      { Icon: Code2, label: "SEO-Ready" },
    ],
    accent: "#6b8cff",
  },

  {
    id: "mobile",
    title: "Mobile App Development",
    subtitle:
      "Android, iOS and cross-platform applications built for speed, security and scalability — delivering beautiful UI and smooth performance.",
    icons: [
      { Icon: Smartphone, label: "iOS & Android" },
      { Icon: Smartphone, label: "Cross-Platform" },
      { Icon: PenTool, label: "UX/UI" },
      { Icon: Smartphone, label: "Notifications" },
      { Icon: Cpu, label: "Optimized" },
      { Icon: GitBranch, label: "Integrations" },
    ],
    accent: "#ff6ad5",
  },

  {
    id: "branding",
    title: "Branding",
    subtitle:
      "Logo design, brand identity, marketing materials and complete digital presence for a professional and consistent brand image.",
    icons: [
      { Icon: PenTool, label: "Logo" },
      { Icon: PenTool, label: "Brand Identity" },
      { Icon: PenTool, label: "Graphics" },
      { Icon: PenTool, label: "Color System" },
      { Icon: PenTool, label: "Typography" },
      { Icon: PenTool, label: "Marketing" },
    ],
    accent: "#ffd24d",
  },

  {
    id: "consulting",
    title: "IT Consulting & Digital Strategy",
    subtitle:
      "Roadmapping, product strategy, technical audits and delivery planning that align technology with your business goals.",
    icons: [
      { Icon: Coffee, label: "Workshops" },
      { Icon: Coffee, label: "Audits" },
      { Icon: Coffee, label: "Roadmaps" },
      { Icon: Coffee, label: "MVP Strategy" },
      { Icon: Coffee, label: "Governance" },
      { Icon: Coffee, label: "Costing" },
    ],
    accent: "#ffb07a",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef();
  
  const { theme } = useTheme(); // 2. Get Theme
  const isDark = theme === "dark";

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, SERVICES.length);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.index);
          if (entry.isIntersecting) setActiveIndex(idx);
        });
      },
      { root: null, rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3. DEFINE DYNAMIC THEME VARIABLES
  const themeVars = {
    "--bg-color": isDark ? "#060b1b" : "#f8f9fa",
    "--text-heading": isDark ? "#f3f6ff" : "#111827",
    "--text-body": isDark ? "#b7dbff" : "#4b5563",
    "--text-sub": isDark ? "#bfe7ff" : "#374151",
    
    // Cards (Left Sections)
    "--card-active-bg": isDark 
      ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.03))"
      : "#ffffff",
    "--card-active-border": isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.1)",
    "--card-shadow": isDark ? "none" : "0 4px 20px rgba(0,0,0,0.05)",

    // Right Sidebar
    "--sidebar-bg": isDark 
      ? "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
      : "#ffffff",
    "--sidebar-border": isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.06)",
    "--sidebar-shadow": isDark ? "0 12px 40px rgba(8,10,25,0.6)" : "0 10px 30px rgba(0,0,0,0.1)",
    
    // Grid Tiles
    "--tile-bg": isDark 
      ? "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.02))"
      : "#f9fafb",
    "--tile-border": isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.05)",
    "--tile-text": isDark ? "#cfefff" : "#4b5563",
    "--tile-icon-color": isDark ? "#fff" : "#1f2937",

    // Sidebar Counter
    "--counter-bg": isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    "--counter-text": isDark ? "#001018" : "#fff",

    // Link
    "--link-color": isDark ? "#ffd7ff" : "#6366f1",
  };

  return (
    <div
      style={{
        paddingTop: 120,
        paddingBottom: 90,
        backgroundColor: "var(--bg-color)", 
        transition: "background-color 0.3s ease",
        ...themeVars // Apply vars to container
      }}
    >
      <div
        className="services-wrap"
        ref={containerRef}
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 22px" }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              color: "var(--text-heading)",
              fontSize: 36,
              margin: 0,
              fontWeight: 800,
              letterSpacing: -0.4,
              transition: "color 0.3s"
            }}
          >
            Our Services
          </h2>

          <p
            style={{
              color: "var(--text-body)",
              maxWidth: 880,
              margin: "12px auto 0",
              fontSize: 16,
              transition: "color 0.3s"
            }}
          >
            Explore the premium digital services we offer —
            web, mobile, branding, consulting & strategy.
          </p>
        </div>

        {/* Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 34,
            alignItems: "start",
          }}
        >
          {/* Left sections */}
          <div>
            {SERVICES.map((s, i) => (
              <section
                key={s.id}
                data-index={i}
                ref={(el) => (sectionRefs.current[i] = el)}
                style={{
                  padding: "34px 22px",
                  marginBottom: 26,
                  borderRadius: 16,
                  
                  // Dynamic Background based on Active State & Theme
                  background: i === activeIndex ? "var(--card-active-bg)" : "transparent",
                  border: i === activeIndex ? "1px solid var(--card-active-border)" : "1px solid transparent",
                  boxShadow: i === activeIndex ? "var(--card-shadow)" : "none",
                  
                  transition: "all 350ms ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 18,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Left icon */}
                  <div
                    style={{
                      minWidth: 78,
                      height: 78,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${s.accent}44, ${s.accent}22)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 8px 26px ${s.accent}33`,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: s.accent,
                      }}
                    >
                      {{
                        web: <Code2 size={38} strokeWidth={1.4} />,
                        mobile: <Smartphone size={38} strokeWidth={1.4} />,
                        branding: <PenTool size={38} strokeWidth={1.4} />,
                        consulting: <Coffee size={38} strokeWidth={1.4} />,
                      }[s.id]}
                    </div>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <h3
                      style={{
                        color: "var(--text-heading)",
                        fontSize: 22,
                        margin: "0 0 8px",
                        fontWeight: 800,
                      }}
                    >
                      {s.title}
                    </h3>

                    <p
                      style={{
                        color: "var(--text-sub)",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {s.subtitle}
                    </p>

                    {/* Progress bar */}
                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div style={{ color: s.accent, fontWeight: 800 }}>
                        {i + 1}/{SERVICES.length}
                      </div>

                      <div
                        style={{
                          flex: 1,
                          height: 6,
                          background: isDark ? "#ffffff10" : "rgba(0,0,0,0.1)",
                          borderRadius: 6,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${((i + 1) / SERVICES.length) * 100}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${s.accent}, rgba(255,255,255,0.06))`,
                            boxShadow: `0 6px 18px ${s.accent}33`,
                            transition: "width 450ms ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Sticky right panel */}
          <aside style={{ position: "sticky", top: 120, alignSelf: "start" }}>
            <div
              style={{
                width: 420,
                padding: 20,
                borderRadius: 16,
                
                background: "var(--sidebar-bg)",
                border: "1px solid var(--sidebar-border)",
                boxShadow: "var(--sidebar-shadow)",
                
                overflow: "hidden",
                transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{ color: "var(--text-heading)", fontWeight: 800, fontSize: 18 }}
                  >
                    {SERVICES[activeIndex].title}
                  </div>

                  <div
                    style={{
                      color: "var(--text-body)",
                      fontSize: 13,
                      marginTop: 6,
                    }}
                  >
                    {activeIndex + 1}/{SERVICES.length}
                  </div>
                </div>

                <div
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, ${SERVICES[activeIndex].accent}, var(--counter-bg))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 16px 45px ${SERVICES[activeIndex].accent}22`,
                    color: "var(--counter-text)",
                    fontWeight: 900,
                    fontSize: 18,
                  }}
                >
                  {activeIndex + 1}
                </div>
              </div>

              <div
                style={{
                  height: 10,
                  borderRadius: 8,
                  background: `linear-gradient(90deg, transparent, ${SERVICES[activeIndex].accent}66, transparent)`,
                  marginBottom: 14,
                }}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 12,
                }}
              >
                {SERVICES[activeIndex].icons.map((ic, idx) => {
                  const Icon = ic.Icon;
                  return (
                    <div
                      key={idx}
                      className={idx === 0 ? "tile-active" : "tile"}
                      style={{
                        height: 112,
                        borderRadius: 12,
                        padding: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        
                        background: "var(--tile-bg)",
                        border: "1px solid var(--tile-border)",
                        
                        transition: "transform 350ms ease, box-shadow 350ms ease",
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          
                          background: isDark 
                            ? "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))"
                            : "rgba(255,255,255,0.8)",
                            
                          boxShadow: idx === 0 
                            ? `0 14px 36px ${SERVICES[activeIndex].accent}33` 
                            : "none",
                            
                          color: "var(--tile-icon-color)",
                        }}
                      >
                        <Icon size={22} strokeWidth={1.5} style={{ color: idx === 0 ? SERVICES[activeIndex].accent : "inherit" }} />
                      </div>

                      <div
                        style={{
                          marginTop: 10,
                          color: "var(--tile-text)",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                      >
                        {ic.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  color: "var(--text-body)",
                  fontSize: 13,
                  marginTop: 14,
                }}
              >
                Need a custom solution?{" "}
                <a
                  href="/contact"
                  style={{ color: "var(--link-color)", fontWeight: 700 }}
                >
                  Contact us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .services-wrap > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          aside {
            position: relative !important;
            top: 0 !important;
            margin-top: 20px;
          }
        }

        .tile:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }
        .tile-active {
          transform: translateY(-8px);
        }

        section[data-index] {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 520ms ease, transform 520ms ease;
        }
        section[data-index].visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <ScriptedReveal />
    </div>
  );
}

function ScriptedReveal() {
  useEffect(() => {
    const elems = Array.from(document.querySelectorAll("section[data-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.05 }
    );

    elems.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}