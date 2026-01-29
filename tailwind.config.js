/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      screens: {
        xs: "480px", // extra small
      },
      colors: {
        primary: {
          500: "#6a00ff",
          600: "#5600d1"
        },
        accent: "#00d2ff",
      },
      borderRadius: {
        xl: "1rem",
      }
    },
  },
  plugins: [],
};
