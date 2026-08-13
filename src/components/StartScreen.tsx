import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useGameStore } from '../store';
import { getTop, HighScore } from '../services/HighScoreService';

export const StartScreen = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const highScores = useGameStore((s) => s.highScores);
  const setHighScores = useGameStore((s) => s.setHighScores);

  useEffect(() => {
    // fetch top scores on mount
    const scores: HighScore[] = getTop();
    setHighScores(scores);
  }, []);

  const handleStart = () => {
    setScreen('countdown');
  };

  return (
    <div className="start-screen" data-testid="start-screen">
      <h1>Pac‑Man 10</h1>
      <button onClick={handleStart} data-testid="start-button">Start</button>
      <h2>High Scores</h2>
      <ol data-testid="high-score-list">
        {highScores.map((s, i) => (
          <li key={i}>{s.initials} — {s.score}</li>
        ))}
      </ol>
    </div>
  );
};
