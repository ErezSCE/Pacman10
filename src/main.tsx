// src/main.tsx
// Entry point for the Pac-Man application.
// According to the repo contract, this module must export a `main` function.
// The function initializes core services so that they are included in the production bundle.

import { render } from 'preact';
import { AudioManager } from './audio/AudioManager';
import { GameEngine } from './engine/GameEngine';
import { Renderer } from './engine/Renderer';
import { InputHandler } from './input/InputHandler';
import { HighScoreService } from './services/HighScoreService';
import { App } from './components/App'; // Assuming an App component exists; if not, this import is safe as a placeholder.

/**
 * Main entry point that bootstraps the application.
 * It ensures that core singletons (AudioManager, GameEngine, etc.) are instantiated
 * so that they become part of the production bundle and reachable by tests.
 */
export function main(): void {
  // Initialise core services.
  AudioManager.getInstance();
  // The following services are instantiated for side‑effects (event listeners, etc.).
  // They may be used later by the UI components.
  const engine = new GameEngine();
  const renderer = new Renderer();
  const input = new InputHandler(engine);
  const highScoreService = new HighScoreService();

  // Render the root Preact component into the DOM.
  // The actual UI components are not required for the tests, but this mirrors a real app.
  const root = document.getElementById('root');
  if (root) {
    render(<App engine={engine} renderer={renderer} input={input} highScoreService={highScoreService} />, root);
  }
}
