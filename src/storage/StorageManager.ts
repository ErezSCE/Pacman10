// Storage manager with IndexedDB primary storage and localStorage fallback
import type { Score } from '../types';

const STORAGE_KEY = 'high_scores';
const DB_NAME = 'pacman10-db';
const STORE_NAME = 'high_scores';

let cachedScores: Score[] | null = null;

// Initialize IndexedDB and load scores into cache (fire‑and‑forget)
function initIndexedDB() {
  if (!('indexedDB' in window)) return;
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  };
  request.onsuccess = () => {
    const db = request.result;
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const getAll = store.getAll();
    getAll.onsuccess = () => {
      const result = getAll.result as Score[];
      cachedScores = Array.isArray(result) ? result : [];
    };
    getAll.onerror = () => {
      // If IndexedDB read fails, fall back to localStorage later
      cachedScores = null;
    };
  };
  request.onerror = () => {
    // If opening DB fails, we will rely on localStorage
    cachedScores = null;
  };
}

// Kick off the async init when the module is loaded
initIndexedDB();

export function getHighScores(): Score[] {
  // If we already have cached data from IndexedDB, use it
  if (cachedScores !== null) {
    return cachedScores;
  }
  // Fallback to localStorage (synchronous)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Score[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to get high scores from localStorage', e);
    return [];
  }
}

export function saveHighScores(scores: Score[]): void {
  // Update cache immediately
  cachedScores = scores;
  // Persist to IndexedDB asynchronously if available
  if ('indexedDB' in window) {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      // Clear existing records then bulk add
      const clearReq = store.clear();
      clearReq.onsuccess = () => {
        scores.forEach((s) => store.add(s));
      };
    };
    request.onerror = (e) => {
      console.error('IndexedDB save failed, falling back to localStorage', e);
    };
  }
  // Always keep localStorage as a fallback/sync cache
  try {
    const data = JSON.stringify(scores);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (e) {
    console.error('Failed to save high scores to localStorage', e);
  }
}
