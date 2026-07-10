import './App.css';
import ClockCard from './components/ClockCard';
import WeatherCard from './components/WeatherCard';
import TodoListCard from './components/TodoListCard';
import QuoteCard from './components/QuoteCard';
import CalendarCard from './components/CalendarCard';
import FitnessTrackerCard from './components/FitnessTrackerCard';
import NewsFeedCard from './components/NewsFeedCard';
import UpcomingEventsCard from './components/UpcomingEventsCard';
import {
  calendarHighlights,
  fitnessStats,
  newsItems,
  upcomingEvents,
} from './data/dashboardData';

function App() {
  return (
    <div className="App">
      <header className="hero">
        <div>
          <p className="eyebrow">Personal Dashboard</p>
          <h1>Stay grounded, come rain or shine.</h1>
          <p className="subtitle">
            Everything you need for a focused, intentional day—time, weather, tasks, and a dose of inspiration.
          </p>
        </div>
      </header>

      <main className="dashboard">
        <ClockCard />
        <WeatherCard />
        <CalendarCard highlights={calendarHighlights} />
        <FitnessTrackerCard stats={fitnessStats} />
        <TodoListCard />
        <QuoteCard />
        <NewsFeedCard news={newsItems} />
        <UpcomingEventsCard events={upcomingEvents} />
      </main>
    </div>
  );
}

export default App;
