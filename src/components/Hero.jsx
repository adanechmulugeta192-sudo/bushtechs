// src/components/Hero.js
import React from "react";
import { Globe, Smartphone, Lightbulb } from "lucide-react";
import heroBg from "../assets/1hero-bg.jpg";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const styles = {
    textPrimary: isDark ? "#ffffff" : "#1a1a2e",
    textSecondary: isDark ? "#ffdfff" : "#4a4a6a",
    textAccent: isDark ? "#ff91f9" : "#d900c5",
    overlay: isDark
      ? "linear-gradient(135deg, rgba(10,0,40,0.9), rgba(0,30,60,0.8), rgba(30,0,50,0.9))"
      : "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(240,245,255,0.88), rgba(255,245,255,0.92))",
    textShadow: isDark ? "0 8px 30px rgba(255,0,140,0.2)" : "none",
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
        color: styles.textPrimary,
        overflow: "hidden",
      }}
    >
      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: styles.overlay,
          zIndex: 1,
        }}
      />

      <div
        className="hero-inner container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          gap: "40px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT CONTENT */}
        <div style={{ flex: 1, minWidth: "280px" }}>
          <div
            style={{
              color: styles.textAccent,
              fontWeight: 600,
              fontSize: "18px",
              letterSpacing: "0.5px",
            }}
          >
            Creative IT & Digital Innovation
          </div>

          <h1
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: "clamp(28px, 6vw, 52px)",
              fontWeight: 900,
              lineHeight: "1.1",
              marginTop: "10px",
              color: styles.textPrimary,
              textShadow: styles.textShadow,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            IT Solutions For <br /> A Digital-First World.
          </h1>

          <p
            style={{
              marginTop: "16px",
              maxWidth: "540px",
              fontSize: "clamp(14px, 2.5vw, 18px)",
              opacity: 0.95,
              color: styles.textSecondary,
              fontWeight: isDark ? 400 : 500,
            }}
          >
            Transform your business with powerful, modern, colorful, and
            innovative digital solutions tailored for impact.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              style={{
                background:
                  "linear-gradient(90deg, #ff00d4, #6a00ff, #00d2ff)",
                padding: "12px 26px",
                borderRadius: "12px",
                fontWeight: 700,
                color: "#fff",
                boxShadow: "0 8px 25px rgba(255,0,220,0.35)",
                textDecoration: "none",
                fontSize: "clamp(14px, 3vw, 16px)",
              }}
            >
              Get a Quote
            </a>

            <a
              href="#projects"
              style={{
                color: isDark ? "#ffcbff" : "#6a00ff",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                fontSize: "clamp(14px, 3vw, 16px)",
              }}
            >
              View Projects →
            </a>
          </div>
        </div>

        {/* RIGHT ORB */}
        <div
          style={{
            width: "clamp(250px, 60vw, 440px)",
            height: "clamp(200px, 45vw, 340px)",
            position: "relative",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            className="orb-perspective"
            style={{
              width: "100%",
              height: "100%",
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
                width: "45%",
                height: "45%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,0,180,0.55), rgba(0,110,255,0.4), rgba(0,255,180,0.25))",
                boxShadow:
                  "0 0 40px rgba(255,0,220,0.4), 0 0 80px rgba(0,150,255,0.3)",
                border: "2px solid rgba(255,255,255,0.15)",
              }}
            />

            {/* ORBITS AND ICON LOGIC (unchanged) */}
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
                    transform: `rotateY(${deg}deg) translateZ(33%)`,
                  }}
                >
                  <div
                    style={{
                      width: "clamp(45px, 10vw, 75px)",
                      height: "clamp(45px, 10vw, 75px)",
                      borderRadius: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #ff00d4, #6a00ff, #00d2ff)",
                      boxShadow:
                        "0 10px 35px rgba(255,0,220,0.5), 0 0 20px rgba(0,200,255,0.45)",
                      color: "#fff",
                    }}
                  >
                    {i === 0 ? (
                      <Globe size={28} />
                    ) : i === 1 ? (
                      <Smartphone size={28} />
                    ) : (
                      <Lightbulb size={28} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SECOND ORBIT */}
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
                    transform: `rotateY(${deg}deg) translateZ(25%) rotateX(12deg)`,
                  }}
                >
                  <div
                    style={{
                      width: "clamp(40px, 8vw, 62px)",
                      height: "clamp(40px, 8vw, 62px)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #ff9100, #ff006e, #00eaff)",
                      boxShadow:
                        "0 10px 35px rgba(255,150,0,0.35), 0 0 22px rgba(0,200,255,0.35)",
                      color: "#ffffff",
                    }}
                  >
                    {i === 0 ? (
                      <Smartphone size={22} />
                    ) : i === 1 ? (
                      <Lightbulb size={22} />
                    ) : (
                      <Globe size={22} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        @keyframes spinY { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
        @keyframes spinX { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }

        /* --- EXTRA RESPONSIVE RULES --- */
        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
