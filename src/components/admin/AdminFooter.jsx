import React from "react";

export default function AdminFooter() {
  const styles = {
    footer: {
      padding: "20px",
      textAlign: "center",
      color: "#64748b", // Muted text
      fontSize: "0.85rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      marginTop: "auto", // Pushes footer to bottom if content is short
    }
  };

  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} BushTechs Solutions. Admin Panel</p>
    </footer>
  );
}