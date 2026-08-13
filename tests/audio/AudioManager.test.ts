import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the howler module before importing the AudioManager.
vi.mock('howler', () => {
  return {
    Howler: {
      mute: vi.fn(),
    },
    Howl: vi.fn().mockImplementation(() => {
      return {
        play: vi.fn(),
        rate: vi.fn(),
      };
    }),
  };
});

// Import after mocking so that the mock is used.
import { setMute, playSound, AudioManager } from '../../src/audio/AudioManager';
import { Howler, Howl } from 'howler';

describe('AudioManager mute functionality', () => {
  beforeEach(() => {
    // Reset mock call history before each test.
    vi.clearAllMocks();
  });

  it('[US-007#1] setMute(true) should mute all sounds', () => {
    setMute(true);
    expect(Howler.mute).toHaveBeenCalledTimes(1);
    expect(Howler.mute).toHaveBeenCalledWith(true);
  });

  it('[US-007#2] setMute(false) should unmute all sounds', () => {
    setMute(false);
    expect(Howler.mute).toHaveBeenCalledTimes(1);
    expect(Howler.mute).toHaveBeenCalledWith(false);
  });

  it('[US-007#3] playSound with pitch should set rate on Howl instance', () => {
    // Call playSound for siren with a pitch value.
    playSound('siren', { pitch: 1.5 });
    // Howl constructor should have been called once for 'siren'.
    expect(Howl).toHaveBeenCalledTimes(1);
    // The created Howl instance's rate method should be called with the pitch.
    const mockHowlInstance = (Howl as any).mock.results[0].value;
    expect(mockHowlInstance.rate).toHaveBeenCalledWith(1.5);
    // And play should be called.
    expect(mockHowlInstance.play).toHaveBeenCalled();
  });
});
