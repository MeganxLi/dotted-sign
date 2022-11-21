/** @type {import('tailwindcss').Config} */

/*eslint-env node*/
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#4F61E8",
        "dark-blue": "#1E2F61",
        "depp-blue": "#2E41CE",
        "green-blue": "#DDF0F4",
        "pale-blue": "#EEF7F9",
        "light-blue": "#F2FDFF",
        "violet-blue": "#3546CC",
        "alert-red": "#EF7054",
        white: "#FFFFFF",
        black: "#2E2E2E",
      },
      boxShadow: {
        base: "0px 2px 20px -4px #CDDDE1",
        primary: "0px 2px 20px -4px #17237A",
        secodary: "0px 2px 20px -8px #6DA9B7",
        alter: "0px 2px 20px -4px #CE583E",
        tag: "0px 2px 12px -4px #92B9C1;",
      },
      borderRadius: {
        large: "40px",
      },
      backgroundImage: {
        "file-cover": "url('/public/images/bg-desktop-1.png')",
        "sign-cover": "url('/public/images/bg-desktop-2.png')",
      },
      content: {
        "file-mobile-cover-left": "url('/public/images/bg-mobile-1-left.png')",
        "file-mobile-cover-right":
          "url('/public/images/bg-mobile-1-right.png')",
        "sign-mobile-cover-left": "url('/public/images/bg-mobile-2-left.png')",
        "sign-mobile-cover-right":
          "url('/public/images/bg-mobile-2-right.png')",
      },
      screens: {
        flat: { max: "870px" },
        flatMin: { min: "870px" },
      },
      cursor: {
        canvas: "url(/src/assets/svg/canvas_cursor.svg), auto",
      },
      height: {
        signHight: "220px",
      },
    },
  },
  plugins: [],
};
