import { render } from 'preact';
import { StartScreen } from './components/StartScreen';

export function main(containerId: string = 'app') {
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Container with id '${containerId}' not found`);
  }
  render(<StartScreen />, container);
}

// Auto-start if script is loaded directly in browser
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    main();
  });
}
