import { h } from 'preact';
import { HighScoreList } from './HighScoreList';
import type { Score } from '../types';

interface Props {
  scores: Score[];
}

export function StartScreen({ scores }: Props) {
  return (
    <div role="region" aria-label="Start Screen">
      <h1>Pac‑Man</h1>
      <button aria-label="Start Game" onClick={() => console.log('start')}>Start Game</button>
      <HighScoreList scores={scores} />
    </div>
  );
}
