import './App.css';
import { ethers } from 'ethers';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useEffect, useState } from 'react';

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
  console.log(window.provider);
} else {
  console.error('Metamask not found');
}

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
