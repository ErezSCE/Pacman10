import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { AppContext } from '../AppContext';

export const StartScreen = () => {
  const { engine, setUiState } = useContext(AppContext);
  const handleStart = () => {
    engine.startGame();
    setUiState('game');
  };
  return (
    <div className="start-screen">
      <h1>Pac-Man</h1>
      <button onClick={handleStart}>Start</button>
    </div>
  );
};
