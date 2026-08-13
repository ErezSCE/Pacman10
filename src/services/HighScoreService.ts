// MOD-HIGHSCORE
import { HighScore } from '../types';
import { getHighScores, saveHighScores } from '../storage/StorageManager';

export class HighScoreService {
  static async getTop(limit: number = 10): Promise<HighScore[]> {
    const all = await getHighScores();
    // sort descending by score
    const sorted = all.sort((a, b) => b.score - a.score);
    return sorted.slice(0, limit);
  }

  static async addScore(score: HighScore): Promise<void> {
    const all = await getHighScores();
    all.push(score);
    await saveHighScores(all);
  }
}

export async function getTop(limit?: number): Promise<HighScore[]> {
  return HighScoreService.getTop(limit);
}

export async function addScore(score: HighScore): Promise<void> {
  return HighScoreService.addScore(score);
}
