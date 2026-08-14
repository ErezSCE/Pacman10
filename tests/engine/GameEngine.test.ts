// tests/engine/GameEngine.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GameEngine } from '../../src/engine/GameEngine';
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
    // Clean up any test‑added level configs
    if (levelConfigs.length > 1) {
      levelConfigs.pop();
    }
  });

  it('[US-004#1] constructor falls back to default config when levelIndex out of range', () => {
    const engine = new GameEngine(999); // out of bounds
    const state = engine.getState();
    expect(state).toBeDefined();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('levelIndex 999 out of range')
    );
  });

  it('[US-004#2] maybeSpawnFruit handles missing fruit definition gracefully', () => {
    const badConfig: LevelConfig = {
      fruitSpawnThresholds: [10, 20],
      fruits: [{ type: 'Apple', points: 500 }], // missing second fruit
      fruitTimeoutMs: 5000,
    };
    levelConfigs.push(badConfig);
    const badIndex = levelConfigs.length - 1;
    const engine = new GameEngine(badIndex);

    // First threshold should spawn the defined fruit
    for (let i = 0; i < 10; i++) engine.eatDot();
    let state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Apple');

    // Collect to allow next spawn attempt
    engine.collectFruit();

    // Reach second threshold where fruit definition is missing
    for (let i = 0; i < 10; i++) engine.eatDot();
    state = engine.getState();
    expect(state.currentFruit).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Missing fruit definition for index 1')
    );
  });

  it('[US-004#3] getState returns a deep copy preventing external mutation', () => {
    const engine = new GameEngine(0);
    // Spawn first fruit
    for (let i = 0; i < 70; i++) engine.eatDot();
    const externalState = engine.getState();
    if (externalState.currentFruit) {
      externalState.currentFruit.type = 'Mutated';
    }
    const internalState = engine.getState();
    expect(internalState.currentFruit?.type).not.toBe('Mutated');
  });

  it('[US-004#4] fruit spawns at correct thresholds with correct type and points', () => {
    const engine = new GameEngine(0);
    expect(engine.getState().currentFruit).toBeNull();
    // First threshold
    for (let i = 0; i < 70; i++) engine.eatDot();
    let state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Cherry');
    expect(state.currentFruit?.points).toBe(100);
    // Collect first fruit
    const points = engine.collectFruit();
    expect(points).toBe(100);
    expect(engine.getState().currentFruit).toBeNull();
    // Second threshold (total 170 dots)
    for (let i = 0; i < 100; i++) engine.eatDot();
    state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Strawberry');
    expect(state.currentFruit?.points).toBe(300);
  });

  it('[US-004#5] collecting a fruit increments score by fruit points', () => {
    const engine = new GameEngine(0);
    for (let i = 0; i < 70; i++) engine.eatDot();
    const beforeScore = engine.getState().score;
    const fruitPoints = engine.getState().currentFruit?.points ?? 0;
    const collected = engine.collectFruit();
    expect(collected).toBe(fruitPoints);
    const afterScore = engine.getState().score;
    expect(afterScore).toBe(beforeScore + fruitPoints);
  });

  it('[US-004#6] fruit times out after timeout duration, setting fruitTimedOut flag', () => {
    const engine = new GameEngine(0);
    // Spawn first fruit
    for (let i = 0; i < 70; i++) engine.eatDot();
    let state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    // Tick beyond the configured timeout (10,000ms) by a small margin
    engine.tick(10001);
    state = engine.getState();
    expect(state.currentFruit).toBeNull();
    expect(state.fruitTimedOut).toBe(true);
  });

  it('[US-004#7] after a fruit times out, next fruit can spawn at subsequent threshold', () => {
    const engine = new GameEngine(0);
    // Spawn and let first fruit timeout
    for (let i = 0; i < 70; i++) engine.eatDot();
    engine.tick(10001);
    let state = engine.getState();
    expect(state.currentFruit).toBeNull();
    expect(state.fruitTimedOut).toBe(true);
    // Eat additional dots to reach second threshold (total 170)
    for (let i = 0; i < 100; i++) engine.eatDot();
    state = engine.getState();
    expect(state.currentFruit).not.toBeNull();
    expect(state.currentFruit?.type).toBe('Strawberry');
    expect(state.fruitTimedOut).toBe(false);
  });
});
