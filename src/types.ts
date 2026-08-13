// Shared types for the Pac-Man project
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface ScoreEntry {
  initials: string;
  score: number;
  achieved_at: string; // ISO date string
}
