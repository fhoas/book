/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray10: "#191919",
        gray9: "#1f1f1f",
        gray8: "#252525",
        gray6: "#666",
        gray5: "#999",
      },
      backgroundColor: {
        gray10: "#191919",
        gray9: "#1f1f1f",
        gray8: "#252525",
        gray6: "#666",
        gray5: "#999",
      },
    },
  },
  plugins: [],
};
