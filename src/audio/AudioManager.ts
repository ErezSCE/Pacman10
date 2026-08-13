// Simple AudioManager stub using Howler.js-like API
export class AudioManager {
  private muted = false;
  private sounds: Record<string, boolean> = {};

  playSound(id: string) {
    if (this.muted) return;
    // In real implementation, would play sound via Howler
    this.sounds[id] = true;
    console.log(`playSound: ${id}`);
  }

  setMute(mute: boolean) {
    this.muted = mute;
    console.log(`AudioManager mute set to ${mute}`);
  }

  isMuted() {
    return this.muted;
  }
}
