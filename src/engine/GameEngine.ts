// Minimal GameEngine stub for wiring purposes
import { AudioManager } from '../audio/AudioManager';
import { HighScoreService } from '../services/HighScoreService';

export type GameState = {
  score: number;
  lives: number;
  level: number;
};

export class GameEngine {
  private state: GameState = { score: 0, lives: 3, level: 1 };
  private intervalId: number | null = null;
  constructor(private audio: AudioManager, private highScore: HighScoreService) {}

  startGame() {
    this.audio.playSound('start');
    // start a dummy loop
    this.intervalId = window.setInterval(() => {
      // simulate scoring over time
      this.state.score += 10;
    }, 1000);
  }

  pauseGame() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.audio.playSound('pause');
  }

  resumeGame() {
    this.audio.playSound('resume');
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => {
        this.state.score += 10;
      }, 1000);
    }
  }

  endGame() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.audio.playSound('death');
    // Save score
    this.highScore.addScore({ initials: 'AAA', score: this.state.score, achieved_at: new Date().toISOString() });
  }

  resetGame() {
    this.state = { score: 0, lives: 3, level: 1 };
  }

  getState(): GameState {
    return this.state;
  }
}
