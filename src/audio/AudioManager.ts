import { Howl, Howler } from 'howler';

/**
 * Import audio assets so that bundler includes them. In this simplified repo we provide empty placeholder files.
 */
import dotSoundUrl from '../assets/dot.mp3';
import pelletSoundUrl from '../assets/pellet.mp3';
import ghostEatSoundUrl from '../assets/ghost_eat.mp3';
import deathSoundUrl from '../assets/death.mp3';
import fruitSoundUrl from '../assets/fruit.mp3';
import extraLifeSoundUrl from '../assets/extra_life.mp3';
import startupSoundUrl from '../assets/startup.mp3';
import sirenSoundUrl from '../assets/siren.mp3';

/**
 * Mapping of sound identifiers to audio file URLs.
 */
const soundSources: Record<string, string> = {
  dot: dotSoundUrl,
  pellet: pelletSoundUrl,
  ghostEat: ghostEatSoundUrl,
  death: deathSoundUrl,
  fruit: fruitSoundUrl,
  extraLife: extraLifeSoundUrl,
  startup: startupSoundUrl,
  siren: sirenSoundUrl,
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
  /** Cache of Howl objects keyed by `${soundId}|${loop}|${pitch}` tuple. */
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
    if (AudioManager.instance) {
      // clear internal cache to avoid memory leaks between tests
      AudioManager.instance.howlCache.clear();
    }
    AudioManager.instance = undefined;
  }

  /**
   * Retrieves a Howl instance for the given parameters, creating it if necessary.
   */
  private getHowl(soundId: string, loop: boolean = false, pitch?: number): Howl {
    const cacheKey = `${soundId}|${loop}|${pitch ?? ''}`;
    const cached = this.howlCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const src = soundSources[soundId];
    if (!src) {
      throw new Error(`Unknown sound id: ${soundId}`);
    }
    const howl = new Howl({ src, loop });
    if (typeof pitch === 'number') {
      howl.rate(pitch);
    }
    this.howlCache.set(cacheKey, howl);
    return howl;
  }

  /**
   * Play a sound by id with optional parameters.
   */
  public play(soundId: string, options: PlaySoundOptions = {}): void {
    const { pitch, loop } = options;
    const howl = this.getHowl(soundId, !!loop, pitch);
    howl.play();
  }

  /**
   * Mute or unmute all sounds.
   */
  public mute(mute: boolean): void {
    Howler.mute(mute);
  }

  /**
   * Adjust the siren pitch based on the current level.
   * The pitch increases linearly with level, capped at 2.0.
   */
  public setSirenPitch(level: number): void {
    const basePitch = 1.0;
    const increment = 0.05; // increase per level
    const maxPitch = 2.0;
    const pitch = Math.min(basePitch + level * increment, maxPitch);
    // Siren is typically looping; ensure we reuse the same Howl instance.
    const howl = this.getHowl('siren', true, pitch);
    // If the Howl was already playing, update its rate.
    howl.rate(pitch);
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
