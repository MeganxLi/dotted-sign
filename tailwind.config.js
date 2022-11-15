/** @type {import('tailwindcss').Config} */

/*eslint-env node*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          FFFFFF: "#FFFFFF",
        },
        dark: {
          E3F6F5: "#E3F6F5",
        },
      },
      dropShadow: {
        serch: ["0px 1px 2px rgba(0, 0, 0, 0.06)", "0px 1px 3px rgba(0, 0, 0, 0.1)"],
      },
      borderRadius: {
        large: "40px",
      },
    },
  },
  plugins: [],
};
