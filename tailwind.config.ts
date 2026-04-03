// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinetic Silk Palette
        ink: "#2d3335",
        surface: {
          DEFAULT: "#ffffff",
          low: "#f8f9fa",
          highest: "#dee2e6",
        },
        outline: {
          variant: "#c4c7cf",
        }
      },
      // デザインシステム指定のフォント
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Be Vietnam Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;