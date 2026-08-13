// Zustand store for UI state management
import create from 'zustand';
import { Screen, HighScore } from './types';

export interface UIState {
  screen: Screen;
  score: number;
  lives: number;
  highScores: HighScore[];
  // actions
  setScreen: (screen: Screen) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  restart: () => void;
  setScore: (score: number) => void;
  setLives: (lives: number) => void;
  setHighScores: (scores: HighScore[]) => void;
}

export const useUIStore = create<UIState>((set) => ({
  screen: 'start',
  score: 0,
  lives: 3,
  highScores: [],
  setScreen: (screen) => set({ screen }),
  startGame: () => set({ screen: 'countdown', score: 0, lives: 3 }),
  pauseGame: () => set({ screen: 'pause' }),
  resumeGame: () => set({ screen: 'game' }),
  gameOver: () => set({ screen: 'gameover' }),
  restart: () => set({ screen: 'start', score: 0, lives: 3 }),
  setScore: (score) => set({ score }),
  setLives: (lives) => set({ lives }),
  setHighScores: (highScores) => set({ highScores }),
}));
