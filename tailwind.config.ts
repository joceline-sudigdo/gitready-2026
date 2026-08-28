import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reference design palette
        background: "#E8EEF5",          // light blue-grey page background
        surface: "#1B3A6B",             // dark navy panel/card background
        "surface-light": "#F0F4F9",     // light card on light bg
        "surface-muted": "#243F73",     // slightly lighter navy variant
        primary: {
          DEFAULT: "#1B3A6B",           // dark navy (main brand)
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#4DC8F5",           // cyan-blue accent (section labels, highlights)
          foreground: "#0A1628",
        },
        ink: "#0A1628",                 // darkest text on light bg
        muted: "#5B7BA8",               // secondary text
        border: "#C5D4E8",
        "navy-dark": "#0F2347",         // footer / deepest navy
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
