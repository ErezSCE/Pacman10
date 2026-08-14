// Level configuration for Pac-Man game
// Defines when fruits appear, their types, point values, and timeout duration.

export type LevelConfig = {
  /** Number of dots that must be eaten to spawn each fruit (in order) */
  fruitSpawnThresholds: number[];
  /** Fruit definitions matching the spawn order */
  fruits: { type: string; points: number }[];
  /** How long (ms) a spawned fruit remains on the board before disappearing */
  fruitTimeoutMs: number;
};

export const levelConfigs: LevelConfig[] = [
  {
    // Classic Pac-Man level 1 thresholds and fruits
    fruitSpawnThresholds: [70, 170],
    fruits: [
      { type: 'Cherry', points: 100 },
      { type: 'Strawberry', points: 300 },
    ],
    fruitTimeoutMs: 10000, // 10 seconds
  },
  // Additional levels could be added here
];
