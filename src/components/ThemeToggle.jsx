// src/components/ThemeToggle.js
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "transparent",
        border: "1px solid",
        borderColor: theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
        padding: "8px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme === "dark" ? "#fff" : "#333",
        marginLeft: "20px", // Add spacing from other nav items
        transition: "all 0.3s ease"
      }}
      title="Toggle Dark/Light Mode"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}