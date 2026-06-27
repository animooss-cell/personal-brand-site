import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00C389",
          50: "#E6FAF2",
          100: "#CCF5E6",
          200: "#99EBCC",
          300: "#66E0B3",
          400: "#33D69C",
          500: "#00C389",
          600: "#009C6E",
          700: "#007553",
          800: "#004E37",
          900: "#00271C",
        },
        "brand-dark": "#0F4C81",
      },
      fontFamily: {
        vazir: ["var(--font-vazirmatn)", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
