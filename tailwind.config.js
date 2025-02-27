/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ketframes:{
        "drop-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          }
        }

      },
      animation: {
        "drop-in": "drop-in 0.5s ease-out",
      },
      colors: {
        secondary: "#84b59f", // Replace with your desired color
        table:"#f0efeb",
        topbar:"#50808e"
      },
    },
  },
  plugins: [],
};
