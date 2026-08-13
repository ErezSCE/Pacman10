import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { Score } from '../types';
import { getTop } from '../services/HighScoreService';

interface Props {
  /** Optional scores for testing or pre‑loaded data */
  scores?: Score[];
}

export function HighScoreList({ scores: propScores }: Props) {
  const [scores, setScores] = useState<Score[]>(propScores ?? []);

  useEffect(() => {
    if (!propScores) {
      setScores(getTop());
    }
  }, [propScores]);

  return (
    <div role="region" aria-label="High Scores">
      <ul role="list">
        {scores.map((s, i) => (
          <li key={i} role="listitem">
            {s.initials} - {s.score}
          </li>
        ))}
      </ul>
    </div>
  );
}
