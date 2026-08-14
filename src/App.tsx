import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { PauseOverlay } from './components/PauseOverlay';
import { GameOverScreen } from './components/GameOverScreen';
import { HighScoreList } from './components/HighScoreList';
import { GameEngine, GameState } from './engine/GameEngine';
import { Renderer } from './engine/Renderer';
import { InputHandler } from './input/InputHandler';
import { AudioManager } from './audio/AudioManager';
import { HighScoreService } from './services/HighScoreService';
import { levelConfigs } from './config/LevelConfig';

export const App = () => {
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const inputRef = useRef<InputHandler | null>(null);
  const audioRef = useRef<AudioManager | null>(null);
  const highScoreRef = useRef<HighScoreService | null>(null);

  useEffect(() => {
    // instantiate services
    const engine = new GameEngine();
    const renderer = new Renderer();
    const input = new InputHandler();
    const audio = new AudioManager();
    const highScore = new HighScoreService();
    engineRef.current = engine;
    rendererRef.current = renderer;
    inputRef.current = input;
    audioRef.current = audio;
    highScoreRef.current = highScore;

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
