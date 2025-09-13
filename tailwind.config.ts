/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

/* basically we'll use these styles by the names that we have defined below through our entire app. hsl(hue saturation lightness)*/
  /* Screens */
  // --breakpoint-xs: 475px;

//    Colors 
//   for ex: you just have to do text-100 and that color will be applied, in the figma design you can see the padding the width and everything, just by selecting the component.
//   also, earlier you had to install and define tailwind plugins in the tailwind.config.ts but now you just need to install them(npm install tailwindcss-animate @tailwindcss/typography
// ) and tailwind will pick them up directly and just
//   Import them at the bottom of our global.css.


const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
      },
      colors: {
        primary: {
          "100": "#FFE8F0",
          DEFAULT: "#EE2B69",
        },
        secondary: "#FBE843",
        black: {
          "100": "#333333",
          "200": "#141413",
          "300": "#7D8087",
          DEFAULT: "#000000",
        },
        white: {
          "100": "#F7F7F7",
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
};

export default config;
