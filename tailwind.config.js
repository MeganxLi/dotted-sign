/** @type {import('tailwindcss').Config} */

/*eslint-env node*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "royal-blue": "#4F61E8",
          "dark-blue": "#1E2F61",
          "depp-blue": "#2E41CE",
          "green-blue": "#DDF0F4",
          "pale-blue": "#EEF7F9",
          "light-blue": "#F2FDFF",
          "alert-red": "#EF7054",
          white: "#FFFFFF",
          black: "#2E2E2E",
        },
      },
      dropShadow: {
        base: "0px 2px 20px -4px #CDDDE1",
        primary: "0px 2px 20px -4px #17237A",
        secodary: "0px 2px 20px -8px #6DA9B7",
        Alert: "0px 2px 20px -4px #CE583E",
      },
      borderRadius: {
        large: "40px",
      },
      backgroundImage: {
        "file-cover": "url('/public/images/bg-desktop-1.png')",
        "file-mobile-cover-left": "url('/public/images/bg-mobile-1-left.png')",
        "file-mobile-cover-right": "url('/public/images/bg-mobile-1-right.png')",
        "sign-cover": "url('/public/images/bg-desktop-2.png')",
        "sign-mobile-cover-left": "url('/public/images/bg-mobile-2-left.png')",
        "sign-mobile-cover-right": "url('/public/images/bg-mobile-2-right.png')",
      },
    },
  },
  plugins: [],
};
