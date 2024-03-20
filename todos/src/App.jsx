import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';
import { getTodos } from './services/blockchainService';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosInit = async () => {
      try {
        const updatedTodos = await getTodos();
        console.log('Todos fetched from contract:', updatedTodos);
        setTodos(updatedTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    todosInit();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>To-do List</h1>
        <h2>Powered by Blockchain Technology</h2>
      </header>

      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
