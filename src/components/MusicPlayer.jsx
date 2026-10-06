import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

const MusicPlayer = forwardRef(function MusicPlayer(
  { audioSrc = '/assests/audio/music1.mp3', onStateChange },
  ref
) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldResumeOnVisible = useRef(false);

  const updatePlayingState = (status) => {
    setIsPlaying(status);
    if (onStateChange) onStateChange(status);
  };

  const playAudio = () => {
    if (!audioRef.current) return Promise.reject(new Error('No audio element'));
    audioRef.current.volume = 0.35;
    return audioRef.current
      .play()
      .then(() => {
        updatePlayingState(true);
        shouldResumeOnVisible.current = false;
      })
      .catch((err) => {
        console.warn('Audio play request interrupted:', err);
      });
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    updatePlayingState(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
      shouldResumeOnVisible.current = false;
    } else {
      playAudio();
    }
  };

  useImperativeHandle(ref, () => ({
    play: playAudio,
    pause: pauseAudio,
    toggle: toggleAudio,
    isPlaying: () => isPlaying,
  }));

  useEffect(() => {
    const handlePause = () => {
      if (audioRef.current && isPlaying && !audioRef.current.paused) {
        audioRef.current.pause();
        updatePlayingState(false);
        shouldResumeOnVisible.current = true;
      }
    };

    const handleResume = () => {
      if (audioRef.current && shouldResumeOnVisible.current) {
        playAudio().catch(() => {
          shouldResumeOnVisible.current = false;
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handlePause();
      } else {
        handleResume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handlePause);
    window.addEventListener('focus', handleResume);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handlePause);
      window.removeEventListener('focus', handleResume);
    };
  }, [isPlaying]);

  return (
    <audio ref={audioRef} loop preload="auto">
      <source src={audioSrc} type="audio/mpeg" />
    </audio>
  );
});

export default MusicPlayer;
