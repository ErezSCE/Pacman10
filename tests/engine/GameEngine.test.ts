import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GameEngine, GameState } from '../../src/engine/GameEngine';
import { levelConfigs, LevelConfig } from '../../src/config/LevelConfig';

/**
 * US-004: Fruit spawning and state encapsulation
 */

describe('GameEngine', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    // Clean up any test-added level configs
    if (levelConfigs.length > 1) {
      levelConfigs.pop();
    }
  });

  it('[US-004#1] constructor falls back to default config when levelIndex out of range', () => {
    const engine = new GameEngine(999); // out of bounds
    // Should not throw and should use first config (index 0)
    const state = engine.getState();
    expect(state).toBeDefined();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('levelIndex 999 out of range')
    );
  });

  it('[US-004#2] maybeSpawnFruit handles missing fruit definition gracefully', () => {
    // Create a mismatched config: two thresholds but only one fruit definition
    const badConfig: LevelConfig = {
      fruitSpawnThresholds: [10, 20],
      fruits: [{ type: 'Apple', points: 500 }], // missing second fruit
      fruitTimeoutMs: 5000,
    };
    // Append to levelConfigs for this test
    levelConfigs.push(badConfig);
    const badIndex = levelConfigs.length - 1;
    const engine = new GameEngine(badIndex);

    // Eat enough dots to reach first threshold (should spawn fruit)
    for (let i = 0; i < 10; i++) engine.eatDot();
    let state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Apple');

    // Clear fruit to allow next spawn attempt
    engine.collectFruit();

    // Eat enough dots to reach second threshold where fruit definition is missing
    for (let i = 0; i < 10; i++) engine.eatDot();
    state = engine.getState();
    // No fruit should be spawned and a warning should be logged
    expect(state.currentFruit).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Missing fruit definition for index 1')
    );
  });

  it('[US-004#3] getState returns a deep copy preventing external mutation', () => {
    const engine = new GameEngine(0);
    // Spawn a fruit
    for (let i = 0; i < 70; i++) engine.eatDot();
    const externalState = engine.getState();
    // Mutate the returned object
    if (externalState.currentFruit) {
      externalState.currentFruit.type = 'Mutated';
    }
    // Engine's internal state should remain unchanged
    const internalState = engine.getState();
    expect(internalState.currentFruit?.type).not.toBe('Mutated');
  });

  it('[US-004#4] fruit spawns at correct thresholds with correct type and points', () => {
    const engine = new GameEngine(0);
    // No fruit initially
    expect(engine.getState().currentFruit).toBeNull();
    // Eat 70 dots to reach first threshold
    for (let i = 0; i < 70; i++) engine.eatDot();
    let state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Cherry');
    expect(state.currentFruit?.points).toBe(100);
    // Collect the fruit to advance
    const points = engine.collectFruit();
    expect(points).toBe(100);
    // After collection, no fruit should be present
    expect(engine.getState().currentFruit).toBeNull();
    // Eat more dots to reach second threshold (total 170)
    for (let i = 0; i < 100; i++) engine.eatDot(); // now total 170 dots eaten
    state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Strawberry');
    expect(state.currentFruit?.points).toBe(300);
  });

  it('[US-004#5] collecting a fruit increments score by fruit points', () => {
    const engine = new GameEngine(0);
    // Spawn first fruit
    for (let i = 0; i < 70; i++) engine.eatDot();
    const beforeScore = engine.getState().score;
    const fruitPoints = engine.getState().currentFruit?.points ?? 0;
    const collected = engine.collectFruit();
    expect(collected).toBe(fruitPoints);
    const afterScore = engine.getState().score;
    expect(afterScore).toBe(beforeScore + fruitPoints);
  });
});
