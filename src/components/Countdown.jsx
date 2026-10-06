import React, { useState, useEffect } from 'react';

export default function Countdown({ targetDate = '2026-10-11T11:00:00+05:30' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPassed) {
    return (
      <div className="countdown-container">
        <span className="countdown-value" style={{ fontSize: '18px', fontStyle: 'italic' }}>
          Alhamdulillah • Happily Celebrated!
        </span>
      </div>
    );
  }

  return (
    <div className="countdown-section" aria-label="Countdown to Nikah">
      <p className="countdown-title">COUNTDOWN TO CELEBRATION</p>
      <div className="countdown-container">
        <div className="countdown-segment">
          <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-divider">:</span>
        <div className="countdown-segment">
          <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-divider">:</span>
        <div className="countdown-segment">
          <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Mins</span>
        </div>
        <span className="countdown-divider">:</span>
        <div className="countdown-segment">
          <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Secs</span>
        </div>
      </div>
    </div>
  );
}
