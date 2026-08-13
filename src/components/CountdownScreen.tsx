import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useGameStore } from '../store';

export const CountdownScreen = () => {
  const setScreen = useGameStore((s) => s.setScreen);

  useEffect(() => {
    let count = 3;
    const interval = setInterval(() => {
      if (count === 0) {
        clearInterval(interval);
        setScreen('game');
      } else {
        // could update UI, but for simplicity we just wait
        count--;
      }
    }, 500); // half second per count for fast test
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-screen" data-testid="countdown-screen">
      <h2>Get Ready...</h2>
    </div>
  );
};
