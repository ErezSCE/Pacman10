import { render } from 'preact';
import { StartScreen } from './components/StartScreen';
import { getTop } from './services/HighScoreService';
import './global.css';

/**
 * Entry point for the application.
 * @param container HTML element to mount the Preact app into.
 */
export function main(container: HTMLElement) {
  const scores = getTop();
  render(<StartScreen scores={scores} />, container);
}
