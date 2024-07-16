/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "788px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      xs: { max: "550px" },
      // => @media (max-width: 639px) { ... }
    },

    fontFamily: {
      exo2: ["Exo 2"],
      fredoka: ["Fredoka"],
    },
    extend: {
      cursor: {
        poke: "url(../assets/logo.png), auto",
      },
    },
  },
  plugins: [],
};
