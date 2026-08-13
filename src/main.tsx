import { render } from 'preact';
import { StartScreen } from './components/StartScreen';
import { FpsMonitor } from './utils/FpsMonitor';

/**
 * Entry point for the application. Renders the initial StartScreen into the
 * element with the given container id (defaults to "app").
 */
export function main(containerId: string = 'app'): void {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container element with id "${containerId}" not found`);
  }
  render(<StartScreen />, container);
}
