// src/storage/StorageManager.ts
/**
 * StorageManager provides async persistence for high scores using IndexedDB.
 * If IndexedDB is unavailable (e.g., in private browsing), it falls back to localStorage.
 */
import type { HighScore } from "../types";

const DB_NAME = "pacman10";
const STORE_NAME = "high_scores";
const DB_VERSION = 1;
const LOCAL_STORAGE_KEY = "pacman10_high_scores";

/** Open (or create) the IndexedDB database */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB not supported"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
  });
}

/** Retrieve all high scores from IndexedDB */
async function getFromIndexedDB(): Promise<HighScore[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      // The stored objects may contain the auto-generated id; strip it.
      const result = (request.result as any[]).map((item) => {
        const { id, ...rest } = item;
        return rest as HighScore;
      });
      resolve(result);
    };
    request.onerror = () => reject(request.error ?? new Error("Failed to read from IndexedDB"));
  });
}

/** Save an array of high scores to IndexedDB (replace existing) */
async function saveToIndexedDB(scores: HighScore[]): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    // Clear existing records first
    const clearReq = store.clear();
    clearReq.onsuccess = () => {
      // Add each score
      let pending = scores.length;
      if (pending === 0) {
        resolve();
        return;
      }
      scores.forEach((score) => {
        const addReq = store.add(score);
        addReq.onsuccess = () => {
          pending--;
          if (pending === 0) resolve();
        };
        addReq.onerror = () => reject(addReq.error ?? new Error("Failed to add score"));
      });
    };
    clearReq.onerror = () => reject(clearReq.error ?? new Error("Failed to clear store"));
  });
}

/** Fallback using localStorage */
function getFromLocalStorage(): HighScore[] {
  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as HighScore[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(scores: HighScore[]): void {
  try {
    const serialized = JSON.stringify(scores);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
  } catch {
    // ignore storage errors
  }
}

/** Public async API – attempts IndexedDB first, falls back to localStorage on any error */
export async function getHighScores(): Promise<HighScore[]> {
  try {
    return await getFromIndexedDB();
  } catch {
    // Fallback
    return getFromLocalStorage();
  }
}

export async function saveHighScores(scores: HighScore[]): Promise<void> {
  try {
    await saveToIndexedDB(scores);
  } catch {
    // Fallback
    saveToLocalStorage(scores);
  }
}

/** Class wrapper matching contract */
export class StorageManager {
  static async getHighScores(): Promise<HighScore[]> {
    return getHighScores();
  }
  static async saveHighScores(scores: HighScore[]): Promise<void> {
    return saveHighScores(scores);
  }
}
