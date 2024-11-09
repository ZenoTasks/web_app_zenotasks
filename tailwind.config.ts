import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#04121B",
        foreground: "#FAEEE3",
        primary: "#7B7C7C",
        secondary: "#347454",
        accent: "#69aabc",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes:{
      "zeno": {
        colors: {
          background: "#04121B",
          foreground: "#FAEEE3",
          primary: "#7B7C7C",
          secondary: "#347454",
          success: "#F7F7F7",
        }
      }
    }
  })],
};
export default config;
