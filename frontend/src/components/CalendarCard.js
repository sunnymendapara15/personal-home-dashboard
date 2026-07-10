import './CalendarCard.css';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarCard = ({ highlights = [] }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });

  const highlightMap = highlights.reduce((acc, highlight) => {
    acc[highlight.date] = highlight;
    return acc;
  }, {});

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = new Date(year, month, 1).getDay();

  const cells = [];
  for (let i = 0; i < offset; i += 1) {
    cells.push(null);
  }
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    const date = new Date(year, month, dayNumber);
    cells.push({
      day: dayNumber,
      iso: date.toISOString().slice(0, 10),
    });
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const todayIso = today.toISOString().slice(0, 10);

  return (
    <section className="card calendar-card">
      <div className="calendar-header">
        <div>
          <p className="label">Calendar</p>
          <h2>
            {monthName} {year}
          </h2>
        </div>
        <p className="calendar-subtitle">Pin reminder days at a glance.</p>
      </div>

      <div className="calendar-grid" aria-label={`Calendar for ${monthName} ${year}`}>
        {weekDays.map((label) => (
          <span key={label} className="calendar-weekday">
            {label}
          </span>
        ))}
        {cells.map((cell, index) => {
          const isToday = cell && cell.iso === todayIso;
          const highlight = cell ? highlightMap[cell.iso] : null;

          return (
            <div
              key={`${index}-${cell ? cell.day : 'empty'}`}
              className={`calendar-cell ${isToday ? 'today' : ''} ${highlight ? 'highlighted' : ''}`.trim()}
            >
              {cell ? (
                <>
                  <span className="calendar-day-number">{cell.day}</span>
                  {highlight && <span className="calendar-event">{highlight.label}</span>}
                </>
              ) : (
                <span aria-hidden="true">&nbsp;</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarCard;
