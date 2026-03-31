// app/components/WordCard.tsx
"use client";
import { motion } from "framer-motion";

// フォントのスタイルマップ
const fontMap: { [key: string]: string } = {
  serif: "font-serif font-medium", 
  sans: "font-sans font-black",   
  mono: "font-mono font-bold",   
};

type Props = {
  word: string;
  color?: string;           // 例: "#ff4500" または "text-blue-500"
  font?: string;            // 例: "serif", "sans", "mono"
  animationJson?: string;   // animateプロパティのJSON文字列
  transitionJson?: string;  // transitionプロパティのJSON文字列
  initialJson?: string;     // initialプロパティのJSON文字列
};

/**
 * JSON文字列を安全にパースし、Framer Motionで扱えるオブジェクトに変換する
 */
const safeJsonParse = (jsonString: string | undefined, fieldName: string): any => {
  if (!jsonString || jsonString.trim() === "") return undefined;
  
  try {
    // 全角の引用符を半角に変換し、不要な空白を除去
    const cleanJson = jsonString
      .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
      .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
      .replace(/\s+/g, ' ');

    const obj = JSON.parse(cleanJson);

    // 💡 "Infinity" 文字列を JavaScript の数値 Infinity に変換
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (obj[key] === "Infinity") {
          obj[key] = Infinity;
        }
      });
    }
    return obj;
  } catch (e) {
    console.error(`[WordCard] ${fieldName} のパースに失敗しました:`, e);
    return undefined;
  }
};

export default function WordCard({ 
  word, 
  color, 
  font, 
  animationJson, 
  transitionJson, 
  initialJson 
}: Props) {
  
  // 各プロパティをパース
  const customAnimate = safeJsonParse(animationJson, "animate");
  const customTransition = safeJsonParse(transitionJson, "transition");
  const customInitial = safeJsonParse(initialJson, "initial");

  // デバッグ用ログ（動きが確認できたら削除してOK）
  console.log(`--- Debug: ${word} ---`);
  console.log("Animate:", customAnimate);
  console.log("Transition:", customTransition);

  // 色の判定（#始まりならインラインスタイル、それ以外はTailwindクラスとして扱う）
  const textColor = color && color.startsWith("#") ? color : undefined;
  const tailwindColorClass = color && !color.startsWith("#") ? color : "text-slate-800";
  
  // フォントクラスの決定
  const fontClass = fontMap[font || "sans"] || fontMap.sans;

  return (
    <div className="perspective-1000 py-10 flex items-center justify-center w-full h-full">
      <motion.h2
        initial={customInitial}
        animate={customAnimate}
        transition={customTransition}
        style={{ color: textColor }}
        className={`text-7xl md:text-[10rem] select-none cursor-default leading-none tracking-tighter ${fontClass} ${tailwindColorClass}`}
      >
        {word}
      </motion.h2>
    </div>
  );
}