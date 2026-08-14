// src/engine/GameEngine.ts
// Minimal GameEngine implementation focused on fruit spawn logic for US-004.

import { levelConfigs, LevelConfig } from "../config/LevelConfig";

import { Fruit } from "../types";

// Removed duplicate Fruit type definition


export type GameState = {
  /** Indicates if the current fruit timed out */
  fruitTimedOut: boolean;

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
    // Validate levelIndex against available configurations.
    // If out of bounds, fallback to the first level configuration to avoid undefined errors.
    if (levelIndex < 0 || levelIndex >= levelConfigs.length) {
      // In a production setting we might throw an error, but for resilience we fallback.
      console.warn(`GameEngine: levelIndex ${levelIndex} out of range, defaulting to 0`);
      this.config = levelConfigs[0];
    } else {
      this.config = levelConfigs[levelIndex];
    }
    this.state = {
      dotsEaten: 0,
      score: 0,
      currentFruit: null,
      fruitElapsedMs: 0,
      fruitTimedOut: false,
    };
  }

  /** Returns a deep copy of the internal state to preserve encapsulation */
  getState(): GameState {
    // Deep copy currentFruit if present to prevent external mutation.
    const fruitCopy = this.state.currentFruit ? { ...this.state.currentFruit } : null;
    return {
      ...this.state,
      currentFruit: fruitCopy,
    };
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
        this.clearFruit(true);
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
  private clearFruit(isTimeout: boolean = false): void {
    // Set flag indicating whether the fruit timed out.
    this.state.fruitTimedOut = isTimeout;
    this.state.currentFruit = null;
    this.state.fruitElapsedMs = 0;
    // Advance to next fruit index regardless of timeout to avoid repeated attempts.
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
      // Guard against missing fruit definition to avoid runtime errors.
      if (!fruitDef) {
        console.warn(
          `GameEngine: Missing fruit definition for index ${this.nextFruitIndex} at threshold ${threshold}`
        );
        return;
      }
      this.state.currentFruit = { type: fruitDef.type, points: fruitDef.points };
      // Reset timeout flag when a new fruit appears
      this.state.fruitTimedOut = false;
      this.state.fruitElapsedMs = 0;
    }
  }
}
