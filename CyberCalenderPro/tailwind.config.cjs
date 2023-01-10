/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F0F5F9",
        secondary: "#C9D6DF",
        thirdy: "#52616B",
        fourth: "#1E2022",

        //dark mode
        primaryDark: "#1a2329",
        secondaryDark: "#0a0f12",
        thirdyDark: "#3282B8",
        fourthyDark: "#BBE1FA",
      },
    },
  },
  plugins: [],
};
