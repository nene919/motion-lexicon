// app/components/StudyTools.tsx
"use client";
import { useState, useEffect } from "react";

export default function StudyTools({ word, id }: { word: string; id: string }) {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isMastered, setIsMastered] = useState(false);

  // ローカルストレージから習得状態を読み込む
  useEffect(() => {
    const masteredList = JSON.parse(localStorage.getItem("mastered_words") || "[]");
    setIsMastered(masteredList.includes(id));
  }, [id]);

  // 習得状態を切り替える
  const toggleMaster = () => {
    const masteredList = JSON.parse(localStorage.getItem("mastered_words") || "[]");
    let newList;
    if (isMastered) {
      newList = masteredList.filter((mid: string) => mid !== id);
    } else {
      newList = [...masteredList, id];
    }
    localStorage.setItem("mastered_words", JSON.stringify(newList));
    setIsMastered(!isMastered);
    // カスタムイベントを発火して、一覧ページのプログレスバーなども更新できるようにする
    window.dispatchEvent(new Event("storage"));
  };

  // 音声再生
  const playSound = () => {
    const uttr = new SpeechSynthesisUtterance(word);
    uttr.lang = "en-US";
    uttr.rate = 0.8;
    window.speechSynthesis.speak(uttr);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6 border-y border-slate-50">
      {/* 🔊 読み上げ */}
      <button onClick={playSound} className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-blue-100 rounded-full text-[10px] font-black tracking-widest transition-all">
        <span>🔊 LISTEN</span>
      </button>

      {/* 👁️ クイズモード切替 */}
      <button 
        onClick={() => {
          setIsBlurred(!isBlurred);
          // ページ内の定義と例文にぼかしを入れる
          const targets = document.querySelectorAll(".study-target");
          targets.forEach(t => t.classList.toggle("blur-md"));
        }} 
        className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest transition-all ${isBlurred ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}`}
      >
        {isBlurred ? "🔓 REVEAL" : "🔒 QUIZ MODE"}
      </button>

      {/* ✅ 習得ボタン */}
      <button 
        onClick={toggleMaster}
        className={`px-6 py-3 rounded-full text-[10px] font-black tracking-widest transition-all ${isMastered ? "bg-green-500 text-white" : "bg-slate-900 text-white hover:bg-green-500"}`}
      >
        {isMastered ? "✓ MASTERED" : "MARK AS MASTERED"}
      </button>
    </div>
  );
}