import React, { useState } from 'react';
import { Volume2, VolumeX, MapPin, Calendar } from 'lucide-react';

export default function TopBar({ isPlaying, onToggleMusic }) {
  const [calendarSaved, setCalendarSaved] = useState(false);

  const handleScrollToMap = () => {
    const mapEl = document.getElementById('venues-map');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Basil & Noora Nikah & Wedding Reception');
    const details = encodeURIComponent(
      'Nikah ceremony at Kadambur Juma Masjid (11:00 AM) followed by Reception at Marwa Groom Residence (12:30 PM).'
    );
    const location = encodeURIComponent('Kadambur, Kannur, Kerala');
    const startDate = '20261011T053000Z'; // 11:00 AM IST = 05:30 UTC
    const endDate = '20261011T110000Z';   // 4:30 PM IST = 11:00 UTC

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');

    setCalendarSaved(true);
    setTimeout(() => setCalendarSaved(false), 3000);
  };

  return (
    <header className="top-action-bar" aria-label="Quick Actions">
      <div className="top-bar-inner">
        <div className="top-bar-brand">
          <span className="brand-monogram">B &amp; N</span>
          <span className="brand-date">11.10.2026</span>
        </div>

        <div className="top-bar-buttons">
          {/* Map Location Quick Jump Button */}
          <button
            type="button"
            className="top-btn"
            onClick={handleScrollToMap}
            title="View Venues & Directions"
          >
            <MapPin size={15} className="btn-icon" />
            <span className="btn-label">Venues</span>
          </button>

          {/* Save Date to Calendar Button */}
          <button
            type="button"
            className={`top-btn ${calendarSaved ? 'btn-active' : ''}`}
            onClick={handleAddToCalendar}
            title="Add to Google Calendar"
          >
            <Calendar size={15} className="btn-icon" />
            <span className="btn-label">
              {calendarSaved ? 'Saved! ✓' : 'Save Date'}
            </span>
          </button>

          {/* Background Music Toggle */}
          {/* <button
            type="button"
            className={`top-btn music-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={onToggleMusic}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label="Toggle Music"
          >
            {isPlaying ? (
              <>
                <Volume2 size={15} className="btn-icon" />
                <span className="sound-waves">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </>
            ) : (
              <VolumeX size={15} className="btn-icon" />
            )}
          </button> */}
        </div>
      </div>
    </header>
  );
}
