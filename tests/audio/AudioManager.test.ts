import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AudioManager, playSound, setMute } from '../../src/audio/AudioManager';
import { Howl, Howler } from 'howler';

// Mock Howler module
vi.mock('howler', () => {
  const mockHowlInstances: any[] = [];
  class MockHowl {
    public src: string[];
    public loop: boolean;
    public rate = vi.fn();
    public play = vi.fn();
    constructor(options: { src: string | string[]; loop?: boolean }) {
      this.src = Array.isArray(options.src) ? options.src : [options.src];
      this.loop = !!options.loop;
      mockHowlInstances.push(this);
    }
  }
  // expose instances for tests
  (MockHowl as any).instances = mockHowlInstances;
  const Howl = MockHowl as unknown as typeof import('howler').Howl;
  const Howler = { mute: vi.fn() } as unknown as typeof import('howler').Howler;
  return { Howl, Howler, __esModule: true };
});

it('[US-007#3] playSound forwards options to AudioManager correctly', () => {
  // Use the convenience function with pitch and loop
  playSound('dot', { pitch: 1.5, loop: true });
  // A temporary Howl should have been created (since pitch is specified)
  const instances = (Howl as any).instances as any[];
  expect(instances.length).toBe(1);
  const tempHowl = instances[0];
  expect(tempHowl.loop).toBe(true);
  // rate should have been called with the pitch value
  expect(tempHowl.rate).toHaveBeenCalledWith(1.5);
  // play should have been called
  expect(tempHowl.play).toHaveBeenCalled();
});

describe('AudioManager', () => {
  beforeEach(() => {
    // Reset mocks and singleton between tests
    vi.resetAllMocks();
    AudioManager.reset();
    // Clear recorded Howl instances
    (Howl as any).instances = [];
  });

  it('[US-007#1] creates separate Howl instances for different loop settings', () => {
    const manager = AudioManager.getInstance();
    // First play without looping
    manager.play('dot', { loop: false });
    // @ts-ignore access private cache size
    const cacheSizeAfterFirst = (manager as any).howlCache.size;
    expect(cacheSizeAfterFirst).toBe(1);
    // @ts-ignore get the stored Howl instance
    const firstHowl = (manager as any).howlCache.values().next().value;
    expect(firstHowl.loop).toBe(false);

    // Play same sound with looping = true
    manager.play('dot', { loop: true });
    // Cache should now have 2 entries (different loop flag)
    const cacheSizeAfterSecond = (manager as any).howlCache.size;
    expect(cacheSizeAfterSecond).toBe(2);
    // Find the Howl with loop true
    const howls = Array.from((manager as any).howlCache.values());
    const loopingHowl = howls.find((h: any) => h.loop === true);
    expect(loopingHowl).toBeDefined();
  });

  it('[US-007#2] reuses Howl instance when same loop flag is used', () => {
    const manager = AudioManager.getInstance();
    manager.play('dot', { loop: true });
    const firstInstance = (manager as any).howlCache.values().next().value;
    manager.play('dot', { loop: true });
    const cacheSize = (manager as any).howlCache.size;
    expect(cacheSize).toBe(1);
    const secondInstance = (manager as any).howlCache.values().next().value;
    expect(secondInstance).toBe(firstInstance);
  });

  it('[US-007#4] mute functionality proxies to Howler', () => {
    setMute(true);
    expect(Howler.mute).toHaveBeenCalledWith(true);
    setMute(false);
    expect(Howler.mute).toHaveBeenCalledWith(false);
  });
});
