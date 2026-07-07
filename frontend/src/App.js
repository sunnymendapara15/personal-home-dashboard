import './App.css';
import ClockCard from './components/ClockCard';
import WeatherCard from './components/WeatherCard';
import TodoListCard from './components/TodoListCard';
import QuoteCard from './components/QuoteCard';

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
        <TodoListCard />
        <QuoteCard />
      </main>
    </div>
  );
}

export default App;
