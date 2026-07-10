import './NewsFeedCard.css';

const NewsFeedCard = ({ news = [] }) => {
  const sortedNews = [...news].sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <section className="card news-card">
      <p className="label">News</p>
      <h2>Need-to-know updates</h2>
      <ul className="news-list">
        {sortedNews.map((item) => {
          const timeLabel = new Date(item.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <li key={item.title}>
              <div>
                <p className="news-title">{item.title}</p>
                <p className="news-meta">
                  {item.source} · {timeLabel}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      {news.length === 0 && <p className="news-empty">No headlines yet. Check back soon.</p>}
    </section>
  );
};

export default NewsFeedCard;
