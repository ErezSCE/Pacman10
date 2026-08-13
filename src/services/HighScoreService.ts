// src/services/HighScoreService.ts
/**
 * HighScoreService provides business logic for managing high scores.
 * It uses the StorageManager for persistence (IndexedDB with localStorage fallback).
 */
import { StorageManager } from "../storage/StorageManager";
import type { HighScore } from "../types";

/**
 * Add a new score to the persisted high‑score list.
 * The list is kept sorted in descending order and trimmed to the top 10 entries.
 */
export async function addScore(initials: string, score: number): Promise<void> {
  // Load existing scores
  const existing = await StorageManager.getHighScores();
  const newScore: HighScore = { initials, score };
  const combined = [...existing, newScore];
  // Sort descending by score
  combined.sort((a, b) => b.score - a.score);
  // Keep only top 10
  const top10 = combined.slice(0, 10);
  await StorageManager.saveHighScores(top10);
}

/**
 * Retrieve the current top‑10 high scores.
 */
export async function getTop(): Promise<HighScore[]> {
  const scores = await StorageManager.getHighScores();
  // Ensure sorted descending (storage may already be sorted, but enforce)
  return scores.sort((a, b) => b.score - a.score);
}

/** Class wrapper matching contract */
export class HighScoreService {
  static async addScore(initials: string, score: number): Promise<void> {
    return addScore(initials, score);
  }
  static async getTop(): Promise<HighScore[]> {
    return getTop();
  }
}
