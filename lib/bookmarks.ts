/**
 * ブックマークした単語（microCMS の vocabulary オブジェクトのスナップショット）を localStorage に保存。
 */

export const BOOKMARKS_STORAGE_KEY = "moving-dict-bookmarks-v1";
export const BOOKMARKS_CHANGED_EVENT = "moving-dict-bookmarks-changed";

export function getBookmarkWords(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBookmarkWords(items: any[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(BOOKMARKS_CHANGED_EVENT));
}

/** ブックマーク済みなら削除し false、未登録なら追加して true を返す */
export function toggleBookmarkWord(item: any): boolean {
  if (typeof window === "undefined" || !item?.id) return false;
  const id = String(item.id);
  const list = getBookmarkWords();
  const exists = list.some((w) => String(w?.id) === id);
  if (exists) {
    saveBookmarkWords(list.filter((w) => String(w?.id) !== id));
    return false;
  }
  saveBookmarkWords([...list, item]);
  return true;
}

export function isWordBookmarked(id: string | undefined): boolean {
  if (!id || typeof window === "undefined") return false;
  const sid = String(id);
  return getBookmarkWords().some((w) => String(w?.id) === sid);
}
