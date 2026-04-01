// app/components/WordCard.tsx
"use client";

import { motion } from "framer-motion";

export default function WordCard({ item }: any) {
  // --- パース関数 ---
  const parseConfig = (jsonStr: string | undefined) => {
    if (!jsonStr) return {};
    try {
      // 1. JSON文字列をオブジェクトに変換
      const config = JSON.parse(jsonStr);

      // 2. "Infinity" という文字列が指定されていたら、JSの Infinity オブジェクトに置換
      if (config.repeat === "Infinity") {
        config.repeat = Infinity;
      }
      
      return config;
    } catch (e) {
      console.error("❌ JSON Parse Error:", e, "Raw String:", jsonStr);
      return {};
    }
  };

  const anim = parseConfig(item.customAnimation);
  const trans = parseConfig(item.customTransition);

  // フォントと色の設定
  const color = item.customColor || "#0f172a";
  const fontFamily = Array.isArray(item.customFont) ? item.customFont[0] : (item.customFont || "sans-serif");

  return (
    <div className="relative group flex flex-col items-center justify-center">
      <div className="relative">
        <motion.h2 
          key={item.id} // 単語切り替え時にアニメーションをリセット
          animate={anim}
          transition={trans}
          className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-center"
          style={{ 
            color: color, 
            fontFamily: fontFamily,
            filter: `drop-shadow(0 20px 40px ${color}33)`,
            display: "block"
          }}
        >
          {item.word}
        </motion.h2>
        
        {/* 下線の装飾（オプション） */}
        <div 
          className="h-2 w-12 mx-auto mt-8 rounded-full opacity-20"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}