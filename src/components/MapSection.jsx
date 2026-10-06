import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Calendar } from 'lucide-react';

export default function MapSection() {
  const [activeVenue, setActiveVenue] = useState('nikah'); // 'nikah' | 'reception'

  const venues = {
    nikah: {
      title: 'Nikah Ceremony',
      place: 'Kadambur Juma Masjid',
      time: '11:00 AM, Sunday, 11 Oct 2026',
      description: 'Kadambur, Kannur District, Kerala',
      mapsQuery: 'Kadambur Juma Masjid Kannur',
      mapsUrl: 'https://maps.app.goo.gl/knFBWASvksqDDpRU9?g_st=iw',
      embedSrc: 'https://maps.google.com/maps?q=Kadambur+Juma+Masjid+Kannur&t=&z=15&ie=UTF8&iwloc=&output=embed',
      icon: '🕌',
    },
    reception: {
      title: 'Reception Venue',
      place: "Marwa (Groom's Residence)",
      time: '12:30 PM, Sunday, 11 Oct 2026',
      description: 'Kadambur, Kannur District, Kerala',
      mapsQuery: 'Kadambur Kannur Kerala',
      mapsUrl: 'https://maps.app.goo.gl/9HTMNrCk6thEDrzVA?g_st=iw',
      embedSrc: 'https://maps.google.com/maps?q=Kadambur+Kannur&t=&z=14&ie=UTF8&iwloc=&output=embed',
      icon: '🏡',
    },
  };

  const current = venues[activeVenue];

  return (
    <section className="map-interactive-section" id="venues-map" aria-label="Venue Locations and Directions">
      <div className="section-header">
        <span className="section-eyebrow">Locations &amp; Directions</span>
        <h2 className="section-title">Ceremony Venues</h2>
        <div className="ornament-divider">
          <span>◆</span>
          <div className="line"></div>
          <span>✦</span>
          <div className="line"></div>
          <span>◆</span>
        </div>
      </div>

      {/* Venue Switcher Tabs */}
      <div className="venue-tabs">
        <button
          type="button"
          className={`venue-tab-btn ${activeVenue === 'nikah' ? 'active' : ''}`}
          onClick={() => setActiveVenue('nikah')}
        >
          <span className="venue-tab-icon">🕌</span>
          <div className="venue-tab-text">
            <strong>Nikah Venue</strong>
            <small>Kadambur Juma Masjid</small>
          </div>
        </button>

        <button
          type="button"
          className={`venue-tab-btn ${activeVenue === 'reception' ? 'active' : ''}`}
          onClick={() => setActiveVenue('reception')}
        >
          <span className="venue-tab-icon">🏡</span>
          <div className="venue-tab-text">
            <strong>Reception</strong>
            <small>Marwa (Residence)</small>
          </div>
        </button>
      </div>

      {/* Venue Card Details */}
      <div className="venue-card">
        <div className="venue-card-info">
          <div className="venue-badge">{current.icon} {current.title}</div>
          <h3 className="venue-name">{current.place}</h3>
          <p className="venue-time">{current.time}</p>
          <p className="venue-address">
            <MapPin size={16} />
            <span>{current.description}</span>
          </p>

          <div className="venue-actions">
            <a
              href={current.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              <Navigation size={17} />
              <span>Get Directions</span>
              <ExternalLink size={14} opacity={0.7} />
            </a>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="venue-map-frame-wrapper">
          <iframe
            title={`Map for ${current.place}`}
            src={current.embedSrc}
            className="venue-map-iframe"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
