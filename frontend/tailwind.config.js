/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f1f3d",
          light: "#1c3461",
          dark: "#0a1529",
        },
        gold: {
          DEFAULT: "#c8a24a",
          light: "#e0c478",
          dark: "#a07f2e",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -8px rgba(15,31,61,0.18)",
        elegant: "0 18px 40px -12px rgba(15,31,61,0.35)",
      },
    },
  },
  plugins: [],
};