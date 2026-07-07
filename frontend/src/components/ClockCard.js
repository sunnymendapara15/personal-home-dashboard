import { useEffect, useState } from 'react';
import './ClockCard.css';

const ClockCard = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="card clock-card" aria-live="polite">
      <p className="label">Current Time</p>
      <p className="clock-time">{timeString}</p>
      <p className="clock-date">{dateString}</p>
      <p className="clock-note">Updated every second, always in sync with your device.</p>
    </section>
  );
};

export default ClockCard;
