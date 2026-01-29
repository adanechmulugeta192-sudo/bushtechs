import React, { useState, useEffect } from "react";
import { Cpu, ArrowUp } from "lucide-react"; //  tech icon + arrow
import { useTheme } from "../context/ThemeContext";

export default function BackToTopButton() {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShow(true);
      else setShow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={goTop}
      className={`back-to-top ${show ? "show" : ""}`}
      style={{
        position: "fixed",
        right: "25px",
        bottom: "30px",
        background: isDark ? "#6a00ff" : "#7c3aed",
        padding: "14px",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.5)",
      }}
    >
      <Cpu size={18} color="#fff" /> {/* Tech Icon */}
      <ArrowUp size={18} color="#fff" /> {/* Arrow Icon */}
    </div>
  );
}
