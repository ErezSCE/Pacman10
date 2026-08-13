import { render } from 'preact';
import { h } from 'preact';

/**
 * Main entry point for the Pacman10 application.
 * Renders a simple placeholder UI into the #app element.
 */
export function main(): void {
  const App = () => <div>Pacman10</div>;
  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Root element #app not found');
  }
  render(<App />, container);
}

// Auto-start when running in the browser via script tag.
if (import.meta.env?.MODE !== 'test') {
  main();
}
