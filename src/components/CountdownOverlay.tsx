import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

/**
 * CountdownOverlay displays a simple 3‑2‑1 countdown followed by "GO!".
 * It calls `onComplete` when the sequence finishes.
 *
 * Props:
 * - `onComplete`: callback invoked after the "GO!" step.
 * - `intervalMs` (optional): time between steps, default 1000ms. Allows tests to speed up.
 */
interface CountdownOverlayProps {
  onComplete: () => void;
  /**
   * Milliseconds between each step of the countdown.
   * Defaults to 1000 (1 second) for production.
   */
  intervalMs?: number;
}

export const CountdownOverlay = ({ onComplete, intervalMs = 1000 }: CountdownOverlayProps) => {
  const [step, setStep] = useState<number>(3); // 3,2,1,0 (GO!)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          // Notify parent after a short delay to allow "GO!" to render
          setTimeout(onComplete, 0);
          return prev;
        }
        return prev - 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, onComplete]);

  const display = step > 0 ? step.toString() : 'GO!';

  return (
    <div className="countdown-overlay" data-testid="countdown-overlay">
      <h2>{display}</h2>
    </div>
  );
};
