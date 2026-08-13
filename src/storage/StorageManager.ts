// Simple storage manager using localStorage (fallback for IndexedDB)
import type { Score } from '../types';

const STORAGE_KEY = 'high_scores';

export function getHighScores(): Score[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Score[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to get high scores', e);
    return [];
  }
}

export function saveHighScores(scores: Score[]): void {
  try {
    const data = JSON.stringify(scores);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (e) {
    console.error('Failed to save high scores', e);
  }
}
