// tests/storageManager.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { StorageManager } from "../src/storage/StorageManager";
import type { HighScore } from "../src/types";

/** Helper to clear both IndexedDB (if available) and localStorage */
async function clearAll() {
  // Clear localStorage
  window.localStorage.clear();
  // Clear IndexedDB store if possible
  if (window.indexedDB) {
    const request = window.indexedDB.deleteDatabase("pacman10");
    await new Promise<void>((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      request.onblocked = () => resolve();
    });
  }
}

describe("[US-008#1] StorageManager persistence", () => {
  beforeEach(async () => {
    await clearAll();
  });

  it("saves and retrieves high scores using IndexedDB when available", async () => {
    const scores: HighScore[] = [
      { initials: "AAA", score: 1000 },
      { initials: "BBB", score: 800 },
    ];
    await StorageManager.saveHighScores(scores);
    const loaded = await StorageManager.getHighScores();
    expect(loaded).toEqual(scores);
  });

  it("falls back to localStorage when IndexedDB is unavailable", async () => {
    // Temporarily remove IndexedDB support
    const original = (window as any).indexedDB;
    // @ts-ignore
    delete (window as any).indexedDB;

    const scores: HighScore[] = [{ initials: "CCC", score: 500 }];
    await StorageManager.saveHighScores(scores);
    const loaded = await StorageManager.getHighScores();
    expect(loaded).toEqual(scores);

    // Restore IndexedDB for other tests
    (window as any).indexedDB = original;
  });
});
