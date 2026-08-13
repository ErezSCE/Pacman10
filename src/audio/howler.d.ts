declare module 'howler' {
  export class Howl {
    constructor(options: { src: string; loop?: boolean });
    play(): number; // returns sound ID
    rate(rate: number): void;
  }
  export const Howler: {
    mute(mute: boolean): void;
  };
}