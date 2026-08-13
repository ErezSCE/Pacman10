// Shared types for the Pac-Man game
export type Screen = "start" | "countdown" | "game" | "pause" | "gameover";

export interface HighScore {
  initials: string;
  score: number;
  achieved_at: string; // ISO string
}
