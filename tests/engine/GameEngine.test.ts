import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from '../../src/engine/GameEngine';
import { levelConfigs } from '../../src/config/LevelConfig';

describe('GameEngine Fruit Spawn Logic (US-004)', () => {
  let engine: GameEngine;
  const levelConfig = levelConfigs[0];

  beforeEach(() => {
    engine = new GameEngine(0); // level 0
  });

  it('[US-004#1] spawns a fruit after the first dot threshold is reached', () => {
    // eat dots up to just before threshold
    for (let i = 0; i < levelConfig.fruitSpawnThresholds[0] - 1; i++) {
      engine.eatDot();
    }
    expect(engine.getState().currentFruit).toBeNull();
    // eat the dot that reaches threshold
    engine.eatDot();
    const state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe(levelConfig.fruits[0].type);
    expect(state.currentFruit?.points).toBe(levelConfig.fruits[0].points);
  });

  it('[US-004#2] fruit disappears after timeout if not collected', () => {
    // spawn fruit
    for (let i = 0; i < levelConfig.fruitSpawnThresholds[0]; i++) {
      engine.eatDot();
    }
    expect(engine.getState().currentFruit).not.toBeNull();
    // advance time beyond timeout
    engine.tick(levelConfig.fruitTimeoutMs + 1);
    expect(engine.getState().currentFruit).toBeNull();
  });

  it('[US-004#3] collecting a fruit awards correct points and clears the fruit', () => {
    // spawn fruit
    for (let i = 0; i < levelConfig.fruitSpawnThresholds[0]; i++) {
      engine.eatDot();
    }
    const fruit = engine.getState().currentFruit!;
    const pointsBefore = engine.getState().score;
    const awarded = engine.collectFruit();
    expect(awarded).toBe(fruit.points);
    expect(engine.getState().score).toBe(pointsBefore + fruit.points);
    expect(engine.getState().currentFruit).toBeNull();
  });
});
