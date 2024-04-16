/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        primaryGrey: "#343434",
        customGreen: "#09B009",
        customRed: "#970000",
        bronze: "#CD7F32",
        silver: "#C0C0C0",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
