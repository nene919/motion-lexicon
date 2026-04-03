import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. sample.html のモダンなカラーシステムを反映
        primary: "#2d3335",
        "on-primary": "#ffffff",
        surface: "#ffffff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f7f9fa",
        "surface-container": "#f0f2f4",
        "surface-container-high": "#e9ecef",
        "surface-container-highest": "#dee2e6",
        "on-surface": "#1a1c1e",
        "on-surface-variant": "#44474e",
        outline: "#74777f",

        // 2. 既存コードとの互換性のために ks 系も維持（中身は新しいカラーへ紐付け）
        ks: {
          ink: "#2d3335", // primaryと同じ
          canvas: "#ffffff",
          "surface-low": "#f8f9fa",
          "surface-highest": "#dee2e6",
          "outline-variant": "#c4c7cf",
        },
      },
      fontFamily: {
        // sample.html で指定されている Plus Jakarta Sans をメインに
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Be Vietnam Pro'", "sans-serif"],
        serif: ["'Noto Serif JP'", "serif"], // 日本語訳用などに
      },
      fontSize: {
        // タイポグラフィのリズム
        "display-2xl": ["6rem", { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "800" }],
        "display-xl": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline-lg": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-sm": ["10px", { lineHeight: "1", letterSpacing: "0.2em", fontWeight: "700" }],
      },
      transitionTimingFunction: {
        // 滑らかな動きを継承
        silk: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      boxShadow: {
        // sample.html 風の非常に薄く拡散した影
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'float': '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;