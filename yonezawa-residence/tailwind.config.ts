import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0a0a0f",
          gold: "#c9a84c",
          "gold-light": "#e5c97e",
          ice: "#e8eef7",
          "ice-dim": "#a8b4c8",
          dark: "#12121a",
          "dark-2": "#1a1a26",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        noto: ["var(--font-noto)", "serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
