import { describe, it, expect } from 'vitest';
import { GameEngine } from '../../src/engine/GameEngine';

describe('GameEngine core mechanics', () => {
  it('[US-001#1] Pac-Man moves down when direction is set and path is clear', () => {
    const engine = new GameEngine();
    // initial pos (1,1)
    engine.setPacManDirection('down');
    engine.update();
    expect(engine.state.pacMan.pos).toEqual({ x: 1, y: 2 });
  });

  it('[US-001#2] Pac-Man does not move into a wall', () => {
    const engine = new GameEngine();
    engine.setPacManDirection('left'); // wall at (0,1)
    engine.update();
    expect(engine.state.pacMan.pos).toEqual({ x: 1, y: 1 });
  });

  it('[US-001#3] Consuming a dot increments score and reduces remaining dots', () => {
    const engine = new GameEngine();
    // Move right onto a dot at (2,1)
    engine.setPacManDirection('right');
    engine.update();
    const { score, remainingDots } = engine.state;
    expect(score).toBe(10);
    // initial dot count is 8 dots + 1 pellet =9, after one dot consumed should be 8
    expect(remainingDots).toBe(8);
  });

  it('[US-001#4] Consuming a power pellet activates scared mode for ghosts', () => {
    const engine = new GameEngine();
    // Move right to (2,1)
    engine.setPacManDirection('right');
    engine.update();
    // Move down to (2,2) which is a power pellet
    engine.setPacManDirection('down');
    engine.update();
    expect(engine.state.score).toBe(20); // dot + pellet each 10
    expect(engine.state.scaredTimer).toBeGreaterThan(0);
    expect(engine.state.ghosts.every(g => g.mode === 'scared')).toBe(true);
  });

  it('[US-001#5] Fruit spawns after required number of dots are eaten', () => {
    const engine = new GameEngine();
    // Simulate 5 dots eaten by setting counters directly
    engine.state.dotsEaten = 5;
    engine.state.remainingDots = 4; // arbitrary
    engine.update();
    expect(engine.state.fruit).toBeDefined();
    expect(engine.state.fruit?.active).toBe(true);
  });

  it('[US-001#6] Pac-Man loses a life when colliding with a non‑scared ghost', () => {
    const engine = new GameEngine();
    const ghost = engine.state.ghosts[0];
    ghost.pos = { ...engine.state.pacMan.pos };
    ghost.mode = 'chase';
    const livesBefore = engine.state.lives;
    engine.update();
    expect(engine.state.lives).toBe(livesBefore - 1);
  });

  it('[US-001#7] Extra life is awarded when score reaches threshold', () => {
    const engine = new GameEngine();
    engine.state.score = 10000;
    const livesBefore = engine.state.lives;
    engine.update();
    expect(engine.state.lives).toBe(livesBefore + 1);
  });
});
