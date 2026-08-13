// src/components/GameScreen.tsx
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useGameStore } from '../store';
import { draw } from '../engine/Renderer';

export const GameScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { score, lives, level, extraLifeEarned, paletteBlind, togglePalette, clearExtraLife } =
    useGameStore();

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // For demo, just draw ghosts using renderer
      draw(ctx, paletteBlind);
      animationFrame = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [paletteBlind]);

  // Extra life notification timeout
  useEffect(() => {
    if (extraLifeEarned) {
      const timer = setTimeout(() => clearExtraLife(), 2000);
      return () => clearTimeout(timer);
    }
  }, [extraLifeEarned, clearExtraLife]);

  const lifeIcons = Array.from({ length: lives }, (_, i) => (
    <span key={i} className="life-icon" aria-label="life">
      ❤️
    </span>
  ));

  return (
    <div className="game-screen">
      <div className="hud">
        <div className="score">Score: {score}</div>
        <div className="lives">Lives: {lifeIcons}</div>
        <div className="level">Level: {level}</div>
        <button className="palette-toggle" onClick={togglePalette}>
          {paletteBlind ? 'Standard Palette' : 'Color‑Blind Palette'}
        </button>
      </div>
      {extraLifeEarned && <div className="extra-life-notif">Extra Life!</div>}
      <canvas ref={canvasRef} width={400} height={200} className="game-canvas" />
      <style jsx>{`
        .game-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          height: 100%;
        }
        .hud {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        .game-canvas {
          border: 1px solid #333;
          max-width: 100%;
          height: auto;
        }
        .extra-life-notif {
          position: absolute;
          top: 10%;
          background: gold;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          animation: fade 2s forwards;
        }
        @keyframes fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
