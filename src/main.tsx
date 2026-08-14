import { render } from 'preact';
import { App } from './App';

export function main() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<App />, container);
}
