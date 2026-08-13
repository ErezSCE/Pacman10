// src/store.ts
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export interface GameState {
  score: number;
  lives: number;
  level: number;
  extraLifeEarned: boolean;
  paletteBlind: boolean;
}

export interface GameActions {
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setLevel: (level: number) => void;
  earnExtraLife: () => void;
  clearExtraLife: () => void;
  togglePalette: () => void;
}

export const useGameStore = create<GameState & GameActions>()(
  devtools((set) => ({
    score: 0,
    lives: 3,
    level: 1,
    extraLifeEarned: false,
    paletteBlind: false,
    setScore: (score) => set({ score }),
    setLives: (lives) => set({ lives }),
    setLevel: (level) => set({ level }),
    earnExtraLife: () => set((state) => ({ extraLifeEarned: true, lives: state.lives + 1 })),
    clearExtraLife: () => set({ extraLifeEarned: false }),
    togglePalette: () => set((state) => ({ paletteBlind: !state.paletteBlind })),
  }))
);
