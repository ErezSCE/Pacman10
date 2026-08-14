import React, { useEffect, useRef } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { PauseOverlay } from './components/PauseOverlay';
import { GameOverScreen } from './components/GameOverScreen';
import { HighScoreList } from './components/HighScoreList';
import { GameEngine } from './engine/GameEngine';
import { Renderer } from './engine/Renderer';


export const App = () => {
  const engineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    // instantiate core services
    const engine = new GameEngine();
    const renderer = new Renderer();
    engineRef.current = engine;

    let animationId: number;
    const loop = () => {
      engine.update();
      renderer.draw(engine.state);
      animationId = requestAnimationFrame(loop);
    };
    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Simple UI: always show GameScreen for now
  return (
    <div id="app-root">
      <StartScreen />
      <GameScreen />
      <PauseOverlay />
      <GameOverScreen />
      <HighScoreList />
    </div>
  );
};
