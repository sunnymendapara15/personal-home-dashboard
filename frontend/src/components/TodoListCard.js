import { useEffect, useMemo, useState } from 'react';
import './TodoListCard.css';

const STORAGE_KEY = 'personal-dashboard-todos';

const TodoListCard = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setTodos(JSON.parse(cached));
      }
    } catch (err) {
      console.error('Unable to read todos from localStorage', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      console.error('Unable to persist todos', err);
    }
  }, [todos]);

  const completedCount = useMemo(() => todos.filter((todo) => todo.done).length, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    const text = inputValue.trim();
    if (!text) {
      setError('Add something meaningful before saving.');
      return;
    }

    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInputValue('');
    setError('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <section className="card todo-card">
      <div className="todo-header">
        <h2>To-do list</h2>
        <span className="todo-stats">
          {completedCount}/{todos.length} completed
        </span>
      </div>
      <form className="todo-form" onSubmit={addTodo}>
        <input
          aria-label="New task"
          placeholder="What needs doing today?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="status status-error">{error}</p>}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button type="button" onClick={() => deleteTodo(todo.id)} aria-label={`Remove ${todo.text}`}>
              &times;
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoListCard;
