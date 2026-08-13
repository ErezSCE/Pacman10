import { getHighScores, saveHighScores } from '../storage/StorageManager';
import type { Score } from '../types';

export class HighScoreService {
  private scores: Score[] = [];

  constructor() {
    this.load();
  }

  private load() {
    this.scores = getHighScores();
  }

  private persist() {
    saveHighScores(this.scores);
  }

  /** Add a new score and keep top 10 sorted descending */
  addScore(newScore: Score) {
    this.scores.push(newScore);
    this.scores.sort((a, b) => b.score - a.score);
    if (this.scores.length > 10) this.scores.length = 10;
    this.persist();
  }

  /** Return a copy of top scores */
  getTop(): Score[] {
    return [...this.scores];
  }
}

// Singleton instance
const highScoreService = new HighScoreService();

export function addScore(score: Score) {
  highScoreService.addScore(score);
}

export function getTop(): Score[] {
  return highScoreService.getTop();
}

export { highScoreService };
