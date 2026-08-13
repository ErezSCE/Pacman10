import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getHighScores, HighScore } from '../storage/StorageManager';

/**
 * Simple component that fetches and displays the list of high scores.
 * It renders an element with id="high-score-list" so that e2e tests can locate it.
 */
export function HighScoreList() {
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    // Load scores on mount.
    getHighScores().then(setScores).catch(() => setScores([]));
  }, []);

  return (
    <div id="high-score-list">
      <h2>High Scores</h2>
      {scores.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        <ul>
          {scores.map((s, idx) => (
            <li key={idx}>
              {s.initials} - {s.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
