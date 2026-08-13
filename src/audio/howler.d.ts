declare module 'howler' {
  export class Howl {
    constructor(options: { src: string; loop?: boolean });
    play(): void;
    rate(rate: number): void;
  }
  export const Howler: {
    mute(mute: boolean): void;
  };
}