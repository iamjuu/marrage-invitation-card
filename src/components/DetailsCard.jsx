import React from 'react';
import Countdown from './Countdown';
import { Calendar } from 'lucide-react';

export default function DetailsCard() {
  const handleAddToCalendar = () => {
    // Generate Google Calendar Link for the Reception on Sept 5, 2026
    const title = encodeURIComponent('Basith & Ajmal Wedding Reception');
    const details = encodeURIComponent('Wedding celebration of Basith & Ajmal at Nanma Auditorium, Thaliparamba.');
    const location = encodeURIComponent('Nanma Auditorium, Thaliparamba, Kerala');
    const startDate = '20260905T063000Z'; // 12:00 PM IST = 06:30 UTC
    const endDate = '20260905T103000Z';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="details-card" aria-label="Wedding details and schedule">
      <p className="details-kicker">Save the Date</p>
      <p className="details-date">05.09.2026</p>

      {/* Countdown to Ceremony */}
      <Countdown targetDate="2026-09-04T16:30:00+05:30" />

      <div className="detail-block">
        <span>Nikkah Ceremony On</span>
        <strong>
          September 04, 2026<br />After Asar Namaz
        </strong>
        <em>At Nelliparamba Thaqwa Juma Masjid</em>
      </div>

      <div className="detail-block">
        <span>Reception On</span>
        <strong>
          September 05, 2026<br />12:00 PM
        </strong>
        <em>At Nanma Auditorium, Thaliparamba</em>
      </div>

      <div>
        <button
          type="button"
          className="calendar-btn"
          onClick={handleAddToCalendar}
          aria-label="Add wedding to Google Calendar"
        >
          <Calendar size={16} />
          Add to Calendar
        </button>
      </div>
    </section>
  );
}
