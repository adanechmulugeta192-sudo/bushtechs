import React from "react";
import { Globe, Smartphone, Lightbulb } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // 3. DEFINE DYNAMIC VARIABLES
  const styles = {
    // Text Colors
    heading: isDark ? "#ffffff" : "#1a1a2e",
    subText: isDark ? "#ffdfff" : "#4a4a6a",
    accentText: isDark ? "#ff91f9" : "#c026d3",
    
    // *** FIX: Watermark Color ***
    // In Dark Mode: Faint White. In Light Mode: Faint Black/Grey (so it shows on white).
    watermark: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.05)",

    // Background Overlay
    overlay: isDark
      ? "linear-gradient(135deg, rgba(10,0,40,0.9), rgba(0,30,60,0.8), rgba(30,0,50,0.9))"
      : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,245,255,0.85), rgba(255,245,255,0.9))",

    textShadow: isDark ? "0 8px 30px rgba(255,0,140,0.2)" : "none",
    link: isDark ? "#ffcbff" : "#6a00ff",
    orbBlendMode: isDark ? "screen" : "normal",
    orbOpacity: isDark ? 1 : 0.3, 
    orbBorder: isDark ? "rgba(255,0,200,0.25)" : "rgba(100,0,100,0.15)"
  };

  return (
    <section
      id="home"
      aria-label="Hero"
      style={{
        position: "relative",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "90px 0",
        color: styles.heading,
        overflow: "hidden",
        transition: "color 0.3s ease",
      }}
    >
      {/* BACKGROUND OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: styles.overlay,
          zIndex: 1,
          transition: "background 0.5s ease",
        }}
      />

      {/* *** NEW: BUSHTECHS BACKGROUND WATERMARK *** */}
      {/* This places the text behind the content but above the background overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "12vw", // Responsive huge size
          fontWeight: "900",
          color: styles.watermark, // Uses the dynamic color fix
          zIndex: 1, // Behind the main content (which is zIndex 2)
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          fontFamily: '"Orbitron", sans-serif',
          transition: "color 0.3s ease",
          letterSpacing: "10px",
        }}
      >
        BUSHTECHS
      </div>

      <div
        className="hero-inner container"
        style={{
          position: "relative",
          zIndex: 2, // Keeps content above the watermark
          display: "flex",
          gap: "40px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT TEXT */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          {/* Added "BUSHTECHS" text here in the small accent div as well */}
          <div
            style={{
              color: styles.accentText,
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "0.5px",
              transition: "color 0.3s",
              textTransform: "uppercase",
              marginBottom: "10px"
            }}
          >
           
          </div>

          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: "1.1",
              marginTop: "10px",
              color: styles.heading,
              textShadow: styles.textShadow,
              letterSpacing: "1px",
              textTransform: "uppercase",
              transition: "color 0.3s",
            }}
          >
            IT Solutions For <br /> A Digital-First World.
          </h1>

          <p
            style={{
              marginTop: "16px",
              maxWidth: "540px",
              fontSize: "18px",
              opacity: 0.95,
              color: styles.subText,
              fontWeight: isDark ? 400 : 500,
              transition: "color 0.3s",
            }}
          >
            Transform your business with powerful, modern, colorful, and
            innovative digital solutions tailored for impact.
          </p>

          {/* BUTTONS */}
          <div style={{ marginTop: "25px", display: "flex", gap: "16px" }}>
            <a
              href="#contact"
              style={{
                background: "linear-gradient(90deg, #ff00d4, #6a00ff, #00d2ff)",
                padding: "12px 26px",
                borderRadius: "12px",
                fontWeight: 700,
                color: "#fff",
                boxShadow: "0 8px 25px rgba(255,0,220,0.35)",
                textDecoration: "none",
              }}
            >
              Get a Quote
            </a>

            <a
              href="#projects"
              style={{
                color: styles.link,
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                transition: "color 0.3s",
              }}
            >
              View Projects →
            </a>
          </div>
        </div>

        {/* RIGHT — COLORFUL 3D ORB */}
        <div
          style={{
            width: "440px",
            height: "340px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="orb-perspective"
            style={{
              width: 360,
              height: 280,
              perspective: "1000px",
              position: "relative",
            }}
          >
            {/* CORE SPHERE */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 190,
                height: 190,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,0,180,0.55), rgba(0,110,255,0.4), rgba(0,255,180,0.25))",
                boxShadow:
                  "0 0 40px rgba(255,0,220,0.4), 0 0 80px rgba(0,150,255,0.3)",
                border: "2px solid rgba(255,255,255,0.15)",
              }}
            />

            {/* COLORFUL ORBIT RING */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) rotateX(65deg)",
                width: 360,
                height: 360,
                borderRadius: "50%",
                border: `2px dashed ${styles.orbBorder}`,
                boxShadow: "0 0 50px rgba(255,0,220,0.2), 0 0 50px rgba(0,200,255,0.13)",
              }}
            />

            {/* ORBIT LAYER 1 — COLOR ICONS */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                animation: "spinY 9s linear infinite",
              }}
            >
              {[0, 120, 240].map((deg, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `rotateY(${deg}deg) translateZ(150px)`,
                  }}
                >
                  <div
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #ff00d4, #6a00ff, #00d2ff)",
                      boxShadow: "0 10px 35px rgba(255,0,220,0.5), 0 0 20px rgba(0,200,255,0.45)",
                      color: "#ffffff",
                    }}
                  >
                    {i === 0 ? <Globe size={34} /> : i === 1 ? <Smartphone size={34} /> : <Lightbulb size={34} />}
                  </div>
                </div>
              ))}
            </div>

            {/* ORBIT LAYER 2 — MORE COLORS */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                animation: "spinX 12s linear infinite reverse",
              }}
            >
              {[60, 180, 300].map((deg, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `rotateY(${deg}deg) translateZ(110px) rotateX(12deg)`,
                  }}
                >
                  <div
                    style={{
                      width: 62,
                      height: 62,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #ff9100, #ff006e, #00eaff)",
                      boxShadow: "0 10px 35px rgba(255,150,0,0.35), 0 0 22px rgba(0,200,255,0.35)",
                      color: "#ffffff",
                    }}
                  >
                    {i === 0 ? <Smartphone size={28} /> : i === 1 ? <Lightbulb size={28} /> : <Globe size={28} />}
                  </div>
                </div>
              ))}
            </div>

            {/* COLOR GLOW BEHIND */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 440,
                height: 440,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,0,200,0.2), rgba(0,140,255,0.12), rgba(0,255,180,0.12))",
                mixBlendMode: styles.orbBlendMode,
                opacity: styles.orbOpacity,
                filter: "blur(35px)",
                pointerEvents: "none"
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}