// MOD-MAIN
import { render } from 'preact';
import { App } from './App';

let currentHash = window.location.hash;
function renderApp() {
  const root = document.getElementById('root') as HTMLElement;
  switch (window.location.hash) {
    case '#game':
      import('./components/GameScreen').then(m => render(<m.GameScreen />, root));
      break;
    case '#pause':
      import('./components/PauseOverlay').then(m => render(<m.PauseOverlay />, root));
      break;
    case '#gameover':
      import('./components/GameOverScreen').then(m => render(<m.GameOverScreen />, root));
      break;
    case '#countdown':
      // simple countdown then start game
      const Countdown = () => {
        const [num, setNum] = preactHooks.useState(3);
        preactHooks.useEffect(() => {
          if (num === 0) {
            window.location.hash = '#game';
            return;
          }
          const id = setTimeout(() => setNum(num - 1), 1000);
          return () => clearTimeout(id);
        }, [num]);
        return <div style="font-size:48px; text-align:center;">{num}</div>;
      };
      render(<Countdown />, root);
      break;
    default:
      import('./components/StartScreen').then(m => render(<m.StartScreen />, root));
  }
}

window.addEventListener('hashchange', renderApp);

export function main() {
  const root = document.getElementById('root');
  if (!root) {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
  }
  renderApp();
}

  const root = document.getElementById('root');
  if (!root) {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
  }
  render(<App />, document.getElementById('root') as HTMLElement);
}

// Auto-start when script is loaded (for dev)
if (import.meta.env?.DEV) {
  main();
}
