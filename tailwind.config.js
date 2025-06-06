/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: [
          "DM Serif Display",
          "-apple-system",
          "Roboto",
          "Helvetica",
          "sans-serif",
        ],
        sans: ["DM Sans", "sans-serif"],
      },

      screens: {
        xs: "475px",
        sm: "640px",
        md: "1024px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
