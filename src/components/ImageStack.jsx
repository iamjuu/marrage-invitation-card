import React from 'react';
import { MapPin } from 'lucide-react';

export default function ImageStack() {
  return (
    <section className="image-stack" aria-label="Invitation gallery and venues">
      {/* 1. Couple Portrait & Names */}
      <div className="img-wrap photo-panel name-panel">
        <img
          src="/assests/images/1.AVIF"
          alt="Basith and Ajmal"
          loading="lazy"
        />
        <div className="name-overlay">
          <p>Basith</p>
          <span>&amp;</span>
          <p>Ajmal</p>
        </div>
      </div>

      {/* 2. Quote Panel */}
      <div className="img-wrap photo-panel quote-panel">
        <img
          src="/assests/images/2.AVIF"
          alt="Wedding celebration backdrop"
          loading="lazy"
        />
        <div className="quote-overlay">
          <p>Together with our families</p>
          <strong>Basith &amp; Ajmal</strong>
          <p>invite you to celebrate this beautiful beginning.</p>
        </div>
      </div>

      {/* 3. Date Ribbon Graphic */}
      <div className="img-wrap">
        <img
          src="/assests/images/3.png"
          alt="Save the date: September 5, 2026"
          loading="lazy"
        />
      </div>

      {/* 4. Map Section */}
      <div className="img-wrap map-section">
        <img
          src="/assests/images/4.AVIF"
          alt="Wedding locations map"
          loading="lazy"
        />

        <div className="map-button">
          <a
            className="map-link"
            href="https://maps.app.goo.gl/Dg9LBzXj4etvY7oo6?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <MapPin size={18} color="#9e7529" />
              <span>Click here to view location</span>
            </div>
            <strong>Nelliparamba Thaqwa Juma Masjid</strong>
          </a>

          <a
            className="map-link"
            href="https://maps.app.goo.gl/PYT43dwjcjopZa5Z6?g_st=iwb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <MapPin size={18} color="#9e7529" />
              <span>Click here to view location</span>
            </div>
            <strong>Nanma Auditorium, Thaliparamba</strong>
          </a>
        </div>
      </div>

      {/* 5. Closing & Credits */}
      <div className="img-wrap photo-panel image-label-wrap">
        <img
          src="/assests/images/5.AVIF"
          alt="Wedding closing invitation"
          loading="lazy"
        />
        <div className="closing-overlay">
          <p>Awaiting your presence</p>
          <strong>Basith &amp; Ajmal</strong>
        </div>
        <a
          className="image-label"
          href="https://www.instagram.com/leora.invite"
          target="_blank"
          rel="noopener noreferrer"
        >
          LEORA.INVITE
        </a>
      </div>
    </section>
  );
}
