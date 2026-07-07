import { useEffect, useMemo, useState } from 'react';
import './WeatherCard.css';

const cityCoordinates = {
  'new york': { lat: 40.7128, lon: -74.006 },
  london: { lat: 51.5074, lon: -0.1278 },
  tokyo: { lat: 35.6762, lon: 139.6503 },
  sydney: { lat: -33.8688, lon: 151.2093 },
  mumbai: { lat: 19.076, lon: 72.8777 },
};

const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Heavy rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
};

const WeatherCard = () => {
  const [cityInput, setCityInput] = useState('New York');
  const [coordinates, setCoordinates] = useState(cityCoordinates['new york']);
  const [city, setCity] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const cityKey = useMemo(() => cityInput.trim().toLowerCase(), [cityInput]);

  useEffect(() => {
    if (!coordinates) return;

    setStatus('loading');
    setError('');
    setInfoMessage('');

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current_weather=true&timezone=auto`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Weather data unavailable');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data.current_weather);
        setStatus('succeeded');
      })
      .catch(() => {
        setError('Unable to retrieve weather data right now.');
        setStatus('failed');
      });
  }, [coordinates]);

  const handleCitySubmit = (event) => {
    event.preventDefault();
    if (!cityKey) {
      setInfoMessage('Please type a city before hitting refresh.');
      return;
    }

    const matched = cityCoordinates[cityKey];
    if (matched) {
      setCoordinates(matched);
      setCity(cityInput.trim());
      setInfoMessage('Loaded weather for ' + cityInput.trim());
      setError('');
    } else {
      setInfoMessage('City not recognized yet. Showing New York by default.');
      setCoordinates(cityCoordinates['new york']);
      setCity('New York');
    }
  };

  const condition = weather ? weatherCodeMap[weather.weathercode] || 'Current conditions' : '';

  return (
    <section className="card weather-card">
      <div className="weather-header">
        <div>
          <p className="label">Weather</p>
          <h2>{city}</h2>
        </div>
        <button type="button" className="refresh-pill" onClick={handleCitySubmit}>
          Refresh
        </button>
      </div>

      {status === 'loading' && <p className="status">Loading weather...</p>}
      {weather && status === 'succeeded' && (
        <div className="weather-body">
          <div className="weather-temp">
            <span className="temp-value">{weather.temperature.toFixed(1)}°C</span>
            <span className="temp-label">Feels like {weather.temperature.toFixed(1)}°C</span>
          </div>
          <div className="weather-meta">
            <p>{condition}</p>
            <p>Wind {weather.windspeed} km/h</p>
            <p>Direction {weather.winddirection}°</p>
          </div>
        </div>
      )}

      {error && <p className="status status-error">{error}</p>}
      {infoMessage && !error && <p className="status status-info">{infoMessage}</p>}

      <form className="weather-form" onSubmit={handleCitySubmit}> 
        <input
          type="text"
          placeholder="Try: London, Tokyo, Mumbai"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
          aria-label="City name"
        />
        <button type="submit">Go</button>
      </form>
    </section>
  );
};

export default WeatherCard;
