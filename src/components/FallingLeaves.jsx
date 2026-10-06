import React, { useMemo } from 'react';

// Generates falling leaves and delicate white blossoms matching the floral theme
export default function FallingLeaves({ count = 22 }) {
  const leaves = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // 3 types: olive leaf, gold-tipped leaf, white flower blossom
      const type = i % 3;
      const left = Math.random() * 100; // 0 to 100vw
      const animationDuration = 7 + Math.random() * 9; // 7s to 16s
      const delay = Math.random() * 10; // staggered start
      const size = 16 + Math.random() * 20; // 16px to 36px
      const swayDuration = 2.5 + Math.random() * 3.5;
      const initialRotation = Math.random() * 360;

      return {
        id: i,
        type,
        left,
        animationDuration,
        delay,
        size,
        swayDuration,
        initialRotation,
      };
    });
  }, [count]);

  return (
    <div className="falling-leaves-container" aria-hidden="true">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf-wrapper"
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.animationDuration}s`,
            animationDelay: `${leaf.delay}s`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
          }}
        >
          <div
            className="leaf-sway"
            style={{
              animationDuration: `${leaf.swayDuration}s`,
              transform: `rotate(${leaf.initialRotation}deg)`,
            }}
          >
            {leaf.type === 0 && (
              // Deep olive leaf
              <svg viewBox="0 0 40 40" width="100%" height="100%">
                <path
                  d="M20,2 C32,10 38,28 20,38 C2,28 8,10 20,2 Z"
                  fill="url(#leafGradOlive)"
                  opacity="0.82"
                />
                <path
                  d="M20,6 L20,34 M20,12 L14,18 M20,20 L26,26 M20,26 L15,31"
                  stroke="#24331e"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            )}

            {leaf.type === 1 && (
              // Golden-amber olive leaf
              <svg viewBox="0 0 40 40" width="100%" height="100%">
                <path
                  d="M20,3 C30,9 36,25 20,37 C4,25 10,9 20,3 Z"
                  fill="url(#leafGradGold)"
                  opacity="0.85"
                />
                <path
                  d="M20,8 L20,32 M20,15 L25,20 M20,22 L15,27"
                  stroke="#7a581e"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            )}

            {leaf.type === 2 && (
              // White blossom petal
              <svg viewBox="0 0 40 40" width="100%" height="100%">
                <g fill="#fffbf3" opacity="0.9">
                  <ellipse cx="20" cy="14" rx="5" ry="8" />
                  <ellipse cx="20" cy="26" rx="5" ry="8" />
                  <ellipse cx="14" cy="20" rx="8" ry="5" />
                  <ellipse cx="26" cy="20" rx="8" ry="5" />
                  <circle cx="20" cy="20" r="3.5" fill="#dfba73" />
                </g>
              </svg>
            )}
          </div>
        </div>
      ))}

      {/* SVG Gradients for leaf shaders */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="leafGradOlive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a633c" />
            <stop offset="60%" stopColor="#2e4222" />
            <stop offset="100%" stopColor="#1e2c16" />
          </linearGradient>
          <linearGradient id="leafGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c5a059" />
            <stop offset="60%" stopColor="#8c6a2c" />
            <stop offset="100%" stopColor="#574013" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
