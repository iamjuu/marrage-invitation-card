import React, { useState, useEffect, useRef } from 'react';
import EnvelopeScreen from './components/EnvelopeScreen';
import MusicPlayer from './components/MusicPlayer';
import TopBar from './components/TopBar';
import InvitationCardHero from './components/InvitationCardHero';
import Countdown from './components/Countdown';
import MapSection from './components/MapSection';
import FallingLeaves from './components/FallingLeaves';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const musicPlayerRef = useRef(null);

  // Lock body scroll while envelope is active
  useEffect(() => {
    if (!isEnvelopeOpened) {
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }

    return () => {
      document.body.classList.remove('is-locked');
    };
  }, [isEnvelopeOpened]);

  const handleEnvelopeOpen = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.play();
      setIsPlayingMusic(true);
    }

    setTimeout(() => {
      setIsEnvelopeOpened(true);
    }, 2750);
  };

  const handleToggleMusic = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.toggle();
      setIsPlayingMusic(!isPlayingMusic);
    }
  };

  return (
    <div className="app-container">
      {/* Falling Leaves Animation Layer */}
      <FallingLeaves count={24} />

      {/* Background Audio Player */}
      <MusicPlayer
        ref={musicPlayerRef}
        audioSrc="/assests/audio/music1.mp3"
        onStateChange={(playing) => setIsPlayingMusic(playing)}
      />

      {/* Clean, Elegant Top Action Bar */}
      <TopBar
        isPlaying={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
      />

      {/* Envelope Overlay */}
      <EnvelopeScreen
        isOpen={isEnvelopeOpened}
        onOpenEnvelope={handleEnvelopeOpen}
      />

      {/* Main Content Area */}
      <main id="main" className="wedding-main-content">
        {/* Hero Card showcasing the uploaded invitation */}
        <InvitationCardHero />

        {/* Live Countdown to 11 October 2026 */}
        <Countdown targetDate="2026-10-11T11:00:00+05:30" />

        {/* Interactive Map & Venues */}
        <MapSection />

        {/* Islamic Wedding Blessing & Dua Footer */}
        <footer className="wedding-footer">
          <div className="footer-ornament">
            <span>❖</span>
            <span className="star">✦</span>
            <span>❖</span>
          </div>
          <p className="dua-arabic">بارك الله لكما وبارك عليكما وجمع بينكما في خير</p>
          <p className="dua-english">
            "May Allah bless you, shower His blessings upon you, and unite you both in goodness."
          </p>
          <p className="dua-sub">Your presence and duas will make our celebration complete.</p>
          <div className="footer-credits">
            <span>Basil Bin Noushad &amp; Noora Nizar</span>
            <small>11 • 10 • 2026</small>
          </div>
        </footer>
      </main>
    </div>
  );
}
