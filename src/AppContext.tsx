import { createContext } from 'preact';
import { GameEngine } from './engine/GameEngine';
import { AudioManager } from './audio/AudioManager';
import { StorageManager } from './storage/StorageManager';
import { HighScoreService } from './services/HighScoreService';

export interface AppContextProps {
  engine: GameEngine;
  audio: AudioManager;
  storage: StorageManager;
  highScoreService: HighScoreService;
  uiState: 'start' | 'game' | 'pause' | 'over';
  setUiState: (state: 'start' | 'game' | 'pause' | 'over') => void;
}

export const AppContext = createContext<AppContextProps>(null as any);
