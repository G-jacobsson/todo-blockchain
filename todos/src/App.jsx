import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import {
  createTodo,
  getTodos,
  removeTodo,
  toggleTodo,
} from './services/blockchainService';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const todosInit = async () => {
      try {
        const updatedTodos = await getTodos();
        console.log('Todos fetched from contract:', updatedTodos);
        setTodos(updatedTodos);
      } catch (error) {
        setError(error.message);
      }
    };
    todosInit();
  }, []);

  const addNewTodo = async (text) => {
    await createTodo(text);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  };

  const deleteTodo = async (id) => {
    try {
      await removeTodo(id);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to remove todo:', error);
    }
  };

  const toggleTodos = async (id) => {
    await toggleTodo(id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      {error && (
        <div className="error">
          <p>{error}</p>
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noreferrer"
          >
            Install Metamask
          </a>
        </div>
      )}
      <header>
        <h1>To-do List</h1>
        <h2>Powered by Blockchain Technology</h2>
      </header>

      <TodoForm addTodo={addNewTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        onToggle={toggleTodos}
      />
    </div>
  );
}

export default App;
