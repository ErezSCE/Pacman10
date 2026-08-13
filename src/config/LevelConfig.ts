// src/config/LevelConfig.ts
// Minimal level configuration for testing purposes.

export type Cell = 0 | 1 | 2 | 3; // 0 empty, 1 wall, 2 dot, 3 power pellet

export interface LevelConfig {
  /** Grid of cells representing the maze */
  layout: Cell[][];
  /** Number of dots required to spawn the first fruit */
  firstFruitAt: number;
  /** Number of dots required to spawn the second fruit */
  secondFruitAt: number;
  /** Points awarded for the fruit */
  fruitPoints: number;
}

// Simple 5x5 layout:
// 1 = wall, 2 = dot, 3 = power pellet, 0 = empty
// Layout:
// 1 1 1 1 1
// 1 2 2 2 1
// 1 2 3 2 1
// 1 2 2 2 1
// 1 1 1 1 1
export const levelConfigs: Record<number, LevelConfig> = {
  1: {
    layout: [
      [1, 1, 1, 1, 1],
      [1, 2, 2, 2, 1],
      [1, 2, 3, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1],
    ],
    firstFruitAt: 5,
    secondFruitAt: 10,
    fruitPoints: 100,
  },
};
