import { Howl, Howler } from 'howler';

/**
 * Mapping of sound identifiers to audio file URLs.
 * In a real project these would point to actual bundled assets.
 * Here we import the mp3 files so that bundlers include them and the paths resolve at runtime.
 */
import dotSound from "../assets/sounds/dot.mp3";
import pelletSound from "../assets/sounds/pellet.mp3";
import ghostEatSound from "../assets/sounds/ghost_eat.mp3";
import deathSound from "../assets/sounds/death.mp3";
import fruitSound from "../assets/sounds/fruit.mp3";
import extraLifeSound from "../assets/sounds/extra_life.mp3";
import startupSound from "../assets/sounds/startup.mp3";
import sirenSound from "../assets/sounds/siren.mp3";

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
    const howl = this.getHowl(soundId, !!loop);
    if (typeof pitch === "number") {
      howl.rate(pitch);
    }
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
