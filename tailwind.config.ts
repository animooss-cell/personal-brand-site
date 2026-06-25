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
          DEFAULT: "#1D9E75",
          50: "#E8F7F1",
          100: "#CCEEE0",
          200: "#99DDC1",
          300: "#66CCA3",
          400: "#33BB84",
          500: "#1D9E75",
          600: "#177E5E",
          700: "#125F46",
          800: "#0C3F2F",
          900: "#062017",
        },
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
