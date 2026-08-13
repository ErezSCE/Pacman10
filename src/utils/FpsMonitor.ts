/**
 * Simple FPS monitor using requestAnimationFrame.
 * Starts measuring when `start()` is called and stores the calculated FPS
 * after at least one second has elapsed.
 */
export class FpsMonitor {
  private frames = 0;
  private startTime = 0;
  private fps = 0;
  private rafId: number | null = null;

  start(): void {
    this.frames = 0;
    this.fps = 0;
    this.startTime = performance.now();
    const tick = () => {
      this.frames++;
      const now = performance.now();
      const elapsed = now - this.startTime;
      if (elapsed >= 1000) {
        // Calculate FPS based on frames counted in the elapsed time.
        this.fps = (this.frames / elapsed) * 1000;
        // Stop further animation frames.
        if (this.rafId !== null) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      } else {
        this.rafId = requestAnimationFrame(tick);
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  /** Returns the measured FPS after `start()` has run for at least one second. */
  getFps(): number {
    return this.fps;
  }
}
