import { h } from 'preact';
import { useEffect } from 'preact/hooks';

/** Simple start screen component */
export function StartScreen() {
  useEffect(() => {
    // placeholder for any start logic
  }, []);
  return (
    <div className="start-screen" role="main">
      <h1>Pacman10</h1>
      <button aria-label="Start Game">Start</button>
    </div>
  );
}
