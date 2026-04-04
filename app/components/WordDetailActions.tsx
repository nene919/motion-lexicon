"use client";

import { useCallback, useEffect, useState } from "react";
import { Volume2, Bookmark, BookmarkCheck } from "lucide-react";
import { isWordBookmarked, toggleBookmarkWord } from "@/lib/bookmarks";

type Props = {
  item: any;
};

export default function WordDetailActions({ item }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(isWordBookmarked(item?.id));
  }, [item?.id]);

  const speak = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => speak(item.word)}
        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-on-surface-variant border border-surface-container-highest shadow-sm hover:bg-primary hover:text-white transition-all active:scale-90 group"
        aria-label="Speak word"
      >
        <Volume2 size={20} className="group-hover:animate-pulse" />
      </button>
      <button
        type="button"
        onClick={() => setIsBookmarked(toggleBookmarkWord(item))}
        className={`w-12 h-12 rounded-full flex items-center justify-center border border-surface-container-highest shadow-sm transition-all active:scale-90 ${
          isBookmarked
            ? "text-on-surface border-outline-variant bg-surface-container-low"
            : "bg-white text-outline hover:text-on-surface"
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
      </button>
    </div>
  );
}
