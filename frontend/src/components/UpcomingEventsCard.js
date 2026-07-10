import './UpcomingEventsCard.css';

const UpcomingEventsCard = ({ events = [] }) => {
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="card events-card">
      <p className="label">Upcoming events</p>
      <h2>Plan for the days ahead</h2>
      <ul className="events-list">
        {sortedEvents.map((event) => {
          const dateLabel = new Date(event.date).toLocaleDateString([], {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <li key={event.title}>
              <div>
                <p className="event-date">{dateLabel}</p>
                <p className="event-title">{event.title}</p>
                <p className="event-meta">
                  {event.time} · {event.location}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      {events.length === 0 && <p className="event-placeholder">No scheduled events yet.</p>}
    </section>
  );
};

export default UpcomingEventsCard;
