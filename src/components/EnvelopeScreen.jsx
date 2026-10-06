import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function EnvelopeScreen({ isOpen, onOpenEnvelope }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);

  // If isOpen is reset to false externally (e.g. from reopen button), reset states
  useEffect(() => {
    if (!isOpen) {
      setOpening(false);
      setGone(false);
      setHidden(false);
    }
  }, [isOpen]);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    if (onOpenEnvelope) {
      onOpenEnvelope();
    }

    // Launch celebratory golden/emerald wedding confetti burst
    try {
      const count = 45;
      const defaults = {
        origin: { y: 0.65 },
        colors: ['#2e4222', '#c49a45', '#f4ead8', '#e8dcc8', '#ffffff', '#dfba73'],
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.6),
        spread: 65,
        startVelocity: 35,
      });

      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: Math.floor(count * 0.4),
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          ...defaults,
          particleCount: Math.floor(count * 0.4),
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
    } catch (e) {
      // Ignored
    }

    // Fade out sequence
    setTimeout(() => {
      setGone(true);
      setTimeout(() => {
        setHidden(true);
      }, 1000);
    }, 1750);
  };

  if (hidden) return null;

  return (
    <div id="env-screen" className={gone ? 'gone' : ''} aria-modal="true" role="dialog">
      <button
        className={`env-outer ${opening ? 'opening' : ''}`}
        id="env"
        type="button"
        aria-label="Open wedding invitation"
        onClick={handleOpen}
      >
        <svg
          className="env-svg"
          viewBox="0 0 340 228"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="340" height="228" rx="4" fill="#e8dcc8"></rect>
          <rect
            width="340"
            height="228"
            rx="4"
            fill="none"
            stroke="#b39f86"
            strokeWidth="1.5"
            opacity="0.55"
          ></rect>
          <path d="M0 228 L170 136 L340 228Z" fill="#d1b79c"></path>
          <path d="M0 0 L170 136 L340 0Z" fill="#d1b79c"></path>
          <path d="M0 0 L170 136 L0 228Z" fill="#c2ab92"></path>
          <path d="M340 0 L170 136 L340 228Z" fill="#c2ab92"></path>
          <path
            d="M0 228 L170 136 L340 228"
            stroke="#b39f86"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          ></path>
          <path
            d="M0 0 L170 136 L340 0"
            stroke="#b39f86"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          ></path>
          <path
            d="M0 0 L340 228"
            stroke="#b39f86"
            strokeWidth="0.8"
            opacity="0.2"
          ></path>
          <path
            d="M340 0 L0 228"
            stroke="#b39f86"
            strokeWidth="0.8"
            opacity="0.2"
          ></path>
        </svg>

        <span id="card-peek">
          <span className="peek-text">You're Invited</span>
        </span>

        <span className="seal">
          <span className="seal-mono">B&amp;N</span>
          <span className="seal-star">&#10022;</span>
        </span>
      </button>

      <p className="tap-hint">Tap the seal to open</p>
    </div>
  );
}
