import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useCallback, useEffect, useState } from 'react';
import blockchainService, {
  getReadContract,
  getWriteContract,
  updateWallet,
} from './services/blockchainService';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [readContract, setReadContract] = useState();
  const [writeContract, setWriteContract] = useState();
  const [wallet, setWallet] = useState({
    accounts: [],
    balance: '',
  });

  useEffect(() => {
    const initApp = async () => {
      try {
        setReadContract(getReadContract());
        setWriteContract(getWriteContract());
        const initialTodos = await blockchainService.getTodos(readContract);
        setTodos(initialTodos);

        const walletData = await updateWallet();
        setWallet(walletData);
      } catch (error) {
        setError(error.message);
      }
    };
    initApp();
  }, []);

  const todosRefresh = useCallback(async () => {
    try {
      const updatedTodos = await blockchainService.getTodos(readContract);
      setTodos(updatedTodos);
    } catch (error) {
      setError(error.message);
    }
  }, [readContract]);

  useEffect(() => {
    if (readContract) {
      todosRefresh();
    }
  }, [readContract, todosRefresh]);

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
        <div className="wrapper wrapper--narrow">
          <h1>To-do List</h1>
          <h2>Powered by Blockchain Technology</h2>
        </div>
      </header>

      {wallet?.accounts.length > 0 && (
        <>
          <div className="wallet wrapper wrapper--narrow">
            Wallet Account: {wallet.accounts[0]}
            <p>Balance: {wallet.balance}</p>
          </div>
        </>
      )}

      <main>
        <div className="wrapper">
          <TodoForm
            contract={writeContract}
            todosRefresh={todosRefresh}
          />
          <TodoList
            todos={todos}
            contract={writeContract}
            todosRefresh={todosRefresh}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
