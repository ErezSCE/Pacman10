// src/engine/GameEngine.ts
// Minimal GameEngine implementation focused on fruit spawn logic for US-004.

import { levelConfigs, LevelConfig } from "../config/LevelConfig";

export type Fruit = {
  type: string;
  points: number;
};

export type GameState = {
  /** Total number of dots eaten in the current level */
  dotsEaten: number;
  /** Current score */
  score: number;
  /** Currently spawned fruit, if any */
  currentFruit: Fruit | null;
  /** Milliseconds elapsed since the current fruit spawned */
  fruitElapsedMs: number;
};

/**
 * GameEngine handles the core game loop relevant to fruit spawning and scoring.
 * It is deliberately lightweight for the purpose of unit testing.
 */
export class GameEngine {
  private config: LevelConfig;
  private state: GameState;
  /** Index of the next fruit to spawn according to the thresholds array */
  private nextFruitIndex: number = 0;

  constructor(levelIndex: number = 0) {
    this.config = levelConfigs[levelIndex];
    this.state = {
      dotsEaten: 0,
      score: 0,
      currentFruit: null,
      fruitElapsedMs: 0,
    };
  }

  /** Returns a shallow copy of the internal state */
  getState(): GameState {
    return { ...this.state };
  }

  /** Simulate eating a dot. Handles fruit spawn checks. */
  eatDot(): void {
    this.state.dotsEaten += 1;
    this.maybeSpawnFruit();
  }

  /** Advance the internal timers. Used by tests to simulate time passing. */
  tick(deltaMs: number): void {
    if (this.state.currentFruit) {
      this.state.fruitElapsedMs += deltaMs;
      if (this.state.fruitElapsedMs >= this.config.fruitTimeoutMs) {
        // Fruit timed out
        this.clearFruit();
      }
    }
  }

  /** Collect the currently spawned fruit, awarding points. */
  collectFruit(): number {
    if (!this.state.currentFruit) return 0;
    const points = this.state.currentFruit.points;
    this.state.score += points;
    this.clearFruit();
    return points;
  }

  /** Private helper to clear any active fruit */
  private clearFruit(): void {
    this.state.currentFruit = null;
    this.state.fruitElapsedMs = 0;
    // Advance to next fruit index so subsequent thresholds are checked correctly
    this.nextFruitIndex += 1;
  }

  /** Determine whether a fruit should spawn based on dots eaten */
  private maybeSpawnFruit(): void {
    // No more fruit definitions
    if (this.nextFruitIndex >= this.config.fruitSpawnThresholds.length) return;
    // Already a fruit on board – wait until it disappears or is collected
    if (this.state.currentFruit) return;
    const threshold = this.config.fruitSpawnThresholds[this.nextFruitIndex];
    if (this.state.dotsEaten >= threshold) {
      const fruitDef = this.config.fruits[this.nextFruitIndex];
      this.state.currentFruit = { type: fruitDef.type, points: fruitDef.points };
      this.state.fruitElapsedMs = 0;
    }
  }
}
