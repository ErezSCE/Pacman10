import { describe, it, expect, vi } from 'vitest';
import { draw, getGhostColors } from '../src/engine/Renderer';

// Helper to create a mock CanvasRenderingContext2D
function createMockContext() {
  // Use any type for the mock context to avoid DOM type dependencies

  const calls: { fillStyle: string; x: number; y: number; size: number }[] = [];
  const ctx: Partial<CanvasRenderingContext2D> = {
    fillStyle: '',
    fillRect: vi.fn((x: number, y: number, w: number, h: number) => {
      // Record the call with current fillStyle
      calls.push({ fillStyle: ctx.fillStyle as string, x, y, size: w });
    }),
  } as any;
  // expose calls for assertions
  (ctx as any).calls = calls;
  return ctx as CanvasRenderingContext2D & { calls: typeof calls };
}

describe('Renderer palette rendering', () => {
  it('[US-001#1] draws ghosts with standard palette when flag false', () => {
    const ctx = createMockContext();
    draw(ctx, false);
    const expected = ['#FF0000', '#FFC0CB', '#00FFFF', '#FFA500'];
    expect(ctx.calls.map(c => c.fillStyle)).toEqual(expected);
  });

  it('[US-001#2] draws ghosts with color‑blind palette when flag true', () => {
    const ctx = createMockContext();
    draw(ctx, true);
    const expected = ['#0000FF', '#800080', '#FFFF00', '#008000'];
    expect(ctx.calls.map(c => c.fillStyle)).toEqual(expected);
  });

  it('[US-001#3] getGhostColors returns correct arrays', () => {
    expect(getGhostColors(false)).toEqual(['#FF0000', '#FFC0CB', '#00FFFF', '#FFA500']);
    expect(getGhostColors(true)).toEqual(['#0000FF', '#800080', '#FFFF00', '#008000']);
  });
});
