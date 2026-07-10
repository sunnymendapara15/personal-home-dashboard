import './FitnessTrackerCard.css';

const FitnessTrackerCard = ({ stats = {} }) => {
  const { steps = 0, goal = 10000, activeMinutes = 0, hydrationLiters = 0, mindfulMinutes = 0 } = stats;
  const progress = Math.min(steps / goal, 1);
  const remaining = Math.max(goal - steps, 0);

  return (
    <section className="card fitness-card">
      <p className="label">Fitness tracker</p>
      <h2>Daily activity snapshot</h2>

      <div className="fitness-progress">
        <div className="fitness-progress-values">
          <span className="fitness-value">{steps.toLocaleString()}</span>
          <span className="fitness-note">Steps of {goal.toLocaleString()}</span>
        </div>
        <div className="progress-bar" aria-hidden="true">
          <span style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="fitness-remaining">
          {remaining > 0 ? `${remaining.toLocaleString()} steps to goal` : 'Goal reached! Keep moving.'}
        </p>
      </div>

      <div className="fitness-metrics">
        <div>
          <p className="metric-label">Active minutes</p>
          <p className="metric-value">{activeMinutes} min</p>
        </div>
        <div>
          <p className="metric-label">Hydration</p>
          <p className="metric-value">{hydrationLiters.toFixed(1)} L</p>
        </div>
        <div>
          <p className="metric-label">Mindful minutes</p>
          <p className="metric-value">{mindfulMinutes} min</p>
        </div>
      </div>
    </section>
  );
};

export default FitnessTrackerCard;
