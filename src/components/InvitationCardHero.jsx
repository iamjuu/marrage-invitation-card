import React, { useState, useRef } from 'react';
import { ZoomIn, MapPin, Calendar, Heart, Share2 } from 'lucide-react';

export default function InvitationCardHero({ onOpenMap, onOpenCalendar }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isZoomed) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -6;
    const tiltY = (x / (rect.width / 2)) * 6;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Basil & Noora Wedding Invitation',
          text: 'Together with our families, we request the honour of your presence as we celebrate our Nikah on Sunday 11 October 2026.',
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  return (
    <section className="invitation-hero-section" aria-label="Wedding Invitation Card">
      {/* Arabic Verse Header */}
      <div className="hero-verse-banner">
        <p className="quran-quote">"AND WE CREATED YOU IN PAIRS"</p>
        <p className="quran-ref">QUR'AN 78:8</p>
      </div>

      {/* Main Interactive Card Frame */}
      <div
        ref={cardRef}
        className="card-3d-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div className="card-outer-glow"></div>

        {/* Golden ambient lanterns glow overlay */}
        <div className="lantern-glow left-lantern"></div>
        <div className="lantern-glow right-lantern"></div>

        <div className="invitation-image-container">
          <img
            src="/assests/images/invitation_card.jpg"
            alt="Basil Bin Noushad & Noora Nizar Wedding Invitation"
            className="invitation-main-img"
            loading="eager"
          />

          {/* Quick interactive action overlay on hover */}
          <div className="card-quick-actions">
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setIsZoomed(true)}
              title="Click to view full size"
            >
              <ZoomIn size={18} />
              <span>Enlarge Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Venue Shortcut Badges */}
      <div className="hero-quick-venues">
        <button
          type="button"
          className="quick-venue-chip"
          onClick={() => {
            const el = document.getElementById('venues-map');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="chip-icon">🕌</span>
          <div className="chip-info">
            <strong>Nikah Ceremony • 11:00 AM</strong>
            <span>Kadambur Juma Masjid</span>
          </div>
        </button>

        <button
          type="button"
          className="quick-venue-chip"
          onClick={() => {
            const el = document.getElementById('venues-map');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="chip-icon">🏡</span>
          <div className="chip-info">
            <strong>Reception • 12:30 PM</strong>
            <span>Marwa (Groom's Residence)</span>
          </div>
        </button>
      </div>

      {/* Share & Blessing buttons */}
      <div className="hero-interaction-row">
        <button type="button" className="action-pill-btn" onClick={handleShare}>
          <Share2 size={16} />
          <span>Share Invitation</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {isZoomed && (
        <div
          className="lightbox-overlay"
          onClick={() => setIsZoomed(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src="/assests/images/invitation_card.jpg"
              alt="Wedding Invitation Full View"
              className="lightbox-img"
            />
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoomed view"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
