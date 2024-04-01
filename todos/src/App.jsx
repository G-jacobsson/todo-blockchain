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
      if (window.ethereum) {
        try {
          window.ethereum.on('accountsChanged', async (accounts) => {
            if (accounts.length > 0) {
              const walletData = await updateWallet();
              setWallet(walletData);
            } else {
              setWallet({ accounts: [], balance: '' });
            }
          });

          const accounts = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            const walletData = await updateWallet();
            setWallet(walletData);
          }
          setReadContract(getReadContract());
          setWriteContract(getWriteContract());
        } catch (error) {
          setError(error.message);
        }
      } else {
        setError('Please install MetaMask to use this app.');
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
          <h3>The ultimate task management in one to-do app</h3>
        </div>
      </header>

      {!wallet.accounts.length ? (
        <div className="login-prompt">
          <p>Please log in to MetaMask</p>
        </div>
      ) : (
        <>
          <div className="wallet wrapper wrapper--narrow">
            Wallet Account: {wallet.accounts[0]}
            <p>Balance: {wallet.balance}</p>
          </div>
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
        </>
      )}
    </div>
  );
}

export default App;
