import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { AppContext } from '../AppContext';

export const GameScreen = () => {
  const { engine, audio, setUiState } = useContext(AppContext);

  const handlePause = () => {
    engine.pauseGame();
    setUiState('pause');
  };

  const toggleMute = () => {
    audio.setMute(!audio.isMuted());
  };

  return (
    <div className="game-screen">
      <button className="pause-btn" onClick={handlePause}>Pause</button>
      <button className="mute-btn" onClick={toggleMute} aria-label={audio.isMuted() ? 'Unmute' : 'Mute'}>
        {audio.isMuted() ? 'Unmute' : 'Mute'}
      </button>
      {/* Canvas placeholder */}
      <canvas id="game-canvas" width="640" height="480"></canvas>
    </div>
  );
};
