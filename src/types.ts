/**
 * Types shared across the application.
 */
export interface HighScore {
  /** Player initials, up to 3 characters */
  initials: string;
  /** Numeric score */
  score: number;
  /** ISO timestamp when the score was achieved */
  achieved_at: string;
  /** Record creation timestamp */
  created_at?: string;
  /** Record last update timestamp */
  updated_at?: string;
}
