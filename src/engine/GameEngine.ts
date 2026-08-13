// MOD-ENGINE
export type GameState = {
  // placeholder for game state properties
  score: number;
  lives: number;
  // ... other properties
};

export class GameEngine {
  private paused: boolean = false;
  private intervalId: number | null = null;
  private state: GameState = { score: 0, lives: 3 };

  start() {
    this.paused = false;
    // start game loop (stub)
    this.intervalId = window.setInterval(() => {
      if (!this.paused) {
        // update state (stub)
        this.state.score += 10;
      }
    }, 1000 / 60);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getState(): GameState {
    return this.state;
  }
}
