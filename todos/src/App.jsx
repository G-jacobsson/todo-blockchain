import './App.css';
import { ethers } from 'ethers';
import TodoForm from './components/TodoForm';

if (window.ethereum) {
  window.provider = new ethers.BrowserProvider(window.ethereum);
  console.log(window.provider);
} else {
  console.error('Metamask not found');
}

function App() {
  return (
    <div className="App">
      <header>
        <h1>To-do List</h1>
        <h2>Powered by Blockchain Technology</h2>
      </header>

      <TodoForm />
    </div>
  );
}

export default App;
