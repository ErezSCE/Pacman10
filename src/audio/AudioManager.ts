import { Howl, Howler } from 'howler';

/**
 * Mapping of sound identifiers to audio file URLs.
 * In a real project these would point to actual bundled assets.
 * Here we import the mp3 files so that bundlers include them and the paths resolve at runtime.
 */
// Sound asset paths. In this simplified repo we use placeholder strings.
const dotSound = "dot.mp3";
const pelletSound = "pellet.mp3";
const ghostEatSound = "ghost_eat.mp3";
const deathSound = "death.mp3";
const fruitSound = "fruit.mp3";
const extraLifeSound = "extra_life.mp3";
const startupSound = "startup.mp3";
const sirenSound = "siren.mp3";

const soundSources: Record<string, string> = {
  dot: dotSound,
  pellet: pelletSound,
  ghostEat: ghostEatSound,
  death: deathSound,
  fruit: fruitSound,
  extraLife: extraLifeSound,
  startup: startupSound,
  siren: sirenSound,
};

/**
 * Options that can be passed to {@link playSound}.
 */
export interface PlaySoundOptions {
  /** Pitch (playback rate) for the sound. 1 is normal speed. */
  pitch?: number;
  /** Whether the sound should loop. */
  loop?: boolean;
}

/**
 * AudioManager handles creation and caching of Howl instances.
 * It also provides a simple mute API that proxies to Howler.
 */
export class AudioManager {
  private static instance: AudioManager;
  /** Cache of Howl objects keyed by `${soundId}|${loop}` tuple. */
  private howlCache: Map<string, Howl> = new Map();

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Reset the singleton instance and its cache. Intended for testing only.
   */
  public static reset(): void {
    AudioManager.instance = undefined;
  }

  /**
   * Retrieves a Howl instance for the given sound id and loop flag, creating it if necessary.
   */
  private getHowl(soundId: string, loop: boolean = false): Howl {
    const cacheKey = `${soundId}|${loop}`;
    const cached = this.howlCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const src = soundSources[soundId];
    if (!src) {
      throw new Error(`Unknown sound id: ${soundId}`);
    }
    const howl = new Howl({ src, loop });
    this.howlCache.set(cacheKey, howl);
    return howl;
  }

  /**
   * Play a sound by id with optional parameters.
   */
  public play(soundId: string, options: PlaySoundOptions = {}): void {
    const { pitch, loop } = options;
    // If a pitch is specified, create a temporary Howl to avoid mutating cached instance.
    if (typeof pitch === "number") {
      const src = soundSources[soundId];
      if (!src) {
        throw new Error(`Unknown sound id: ${soundId}`);
      }
      const tempHowl = new Howl({ src, loop: !!loop });
      tempHowl.rate(pitch);
      tempHowl.play();
      return;
    }
    // No pitch: reuse cached Howl (loop flag considered in cache key).
    const howl = this.getHowl(soundId, !!loop);
    howl.play();
  }

  /**
   * Mute or unmute all sounds.
   */
  public mute(mute: boolean): void {
    Howler.mute(mute);
  }
}

/**
 * Convenience function to play a sound using the singleton manager.
 */
export function playSound(soundId: string, options?: PlaySoundOptions): void {
  AudioManager.getInstance().play(soundId, options);
}

/**
 * Convenience function to mute/unmute all sounds.
 */
export function setMute(mute: boolean): void {
  AudioManager.getInstance().mute(mute);
}
