import { useCallback, useEffect, useState } from 'react';
import './QuoteCard.css';

const QuoteCard = () => {
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const fetchQuote = useCallback(() => {
    setStatus('loading');
    setError('');

    fetch('https://api.quotable.io/random?tags=inspirational|success')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Quote service error');
        }
        return response.json();
      })
      .then((data) => {
        setQuote(data);
        setStatus('succeeded');
      })
      .catch(() => {
        setError('We could not fetch a quote at the moment.');
        setStatus('failed');
      });
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <section className="card quote-card">
      <div className="quote-header">
        <div>
          <p className="label">Motivational quote</p>
          <h2>Fuel for your next move</h2>
        </div>
        <button type="button" onClick={fetchQuote} className="quote-refresh">
          Refresh
        </button>
      </div>

      {status === 'loading' && <p className="status">Fetching inspiration...</p>}
      {quote && status === 'succeeded' && (
        <blockquote>
          <p>“{quote.content}”</p>
          <footer>— {quote.author || 'Unknown'}</footer>
        </blockquote>
      )}
      {error && <p className="status status-error">{error}</p>}
    </section>
  );
};

export default QuoteCard;
