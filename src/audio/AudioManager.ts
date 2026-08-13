import { Howl, Howler } from 'howler';

/**
 * Mapping of sound identifiers to audio file URLs.
 * In a real project these would point to actual assets in the public folder.
 * For the purpose of this exercise we use placeholder strings.
 */
const soundSources: Record<string, string> = {
  dot: '/sounds/dot.mp3',
  pellet: '/sounds/pellet.mp3',
  ghostEat: '/sounds/ghost_eat.mp3',
  death: '/sounds/death.mp3',
  fruit: '/sounds/fruit.mp3',
  extraLife: '/sounds/extra_life.mp3',
  startup: '/sounds/startup.mp3',
  siren: '/sounds/siren.mp3',
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
  /** Cache of Howl objects keyed by sound id. */
  private howlCache: Map<string, Howl> = new Map();

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Retrieves a Howl instance for the given sound id, creating it if necessary.
   */
  private getHowl(soundId: string, loop: boolean = false): Howl {
    const cached = this.howlCache.get(soundId);
    if (cached) {
      return cached;
    }
    const src = soundSources[soundId];
    if (!src) {
      throw new Error(`Unknown sound id: ${soundId}`);
    }
    const howl = new Howl({ src, loop });
    this.howlCache.set(soundId, howl);
    return howl;
  }

  /**
   * Play a sound by id with optional parameters.
   */
  public play(soundId: string, options: PlaySoundOptions = {}): void {
    const { pitch, loop } = options;
    const howl = this.getHowl(soundId, !!loop);
    if (typeof pitch === 'number') {
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
