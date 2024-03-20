import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import blockchainService, {
  getReadContract,
  getWriteContract,
} from './services/blockchainService';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();

  useEffect(() => {
    (async () => {
      try {
        setReadContract(getReadContract());
        setWriteContract(getWriteContract());
      } catch (error) {
        setError(`Failed to get contract: ${error.message}`);
      }
    })();
  }, []);

  useEffect(() => {
    const todosInit = async () => {
      try {
        const updatedTodos = await blockchainService.getTodos();
        setTodos(updatedTodos);
      } catch (error) {
        setError(error.message);
      }
    };
    if (readContract) {
      todosInit();
    }
  }, [readContract]);

  const addNewTodo = async (text) => {
    if (!text.trim()) {
      alert('Please enter a valid todo.');
      return;
    }

    try {
      await blockchainService.createTodo(text);
      const updatedTodos = await blockchainService.getTodos(readContract);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError(`Failed to add todo: ${error.message}`);
    }
  };

  const deleteTodo = async (id) => {
    await blockchainService.removeTodo(id);
    const updatedTodos = await blockchainService.getTodos(readContract);
    setTodos(updatedTodos);
  };

  const toggleTodos = async (id) => {
    await blockchainService.toggleTodo(id);
    const updatedTodos = await blockchainService.getTodos(readContract);
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
