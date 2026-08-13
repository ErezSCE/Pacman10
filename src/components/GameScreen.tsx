import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useGameStore } from '../store';
import { GameEngine } from '../engine/GameEngine';

export const GameScreen = () => {
  const { score, lives, setScreen } = useGameStore();

  // Simulate game over when lives reach 0 (for demo)
  useEffect(() => {
    if (lives <= 0) {
      setScreen('gameover');
    }
  }, [lives]);

  const handlePause = () => {
    setScreen('pause');
  };

  return (
    <div>
      <h2>Game Screen</h2>
      <p>Score: {score}</p>
      <p>Lives: {lives}</p>
      <button onClick={handlePause}>Pause (P)</button>
    </div>
  );
};
