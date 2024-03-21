import { ethers } from 'ethers';
import { address, ABI } from '../config';

const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    throw new Error(
      'Web3 provider not found. Please install a wallet like MetaMask to use the application.'
    );
  }
};

export const updateWallet = async () => {
  let accounts = await await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const balance = await window.ethereum.request({
    method: 'eth_getBalance',
    params: [accounts[0], 'latest'],
  });
  const formatBalance =
    Number(ethers.utils.formatEther(balance)).toFixed(2) + ' ETH';
  return { accounts, balance: formatBalance };
};

export const getReadContract = () => {
  const provider = getProvider();
  return new ethers.Contract(address, ABI, provider);
};

export const getWriteContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(address, ABI, signer);
};

const blockchainService = {
  createTodo: async (text) => {
    await requestAccount();
    const contract = getWriteContract();
    const transaction = await contract.createTodo(text);
    await transaction.wait();
  },

  removeTodo: async (id) => {
    await requestAccount();
    const contract = getWriteContract();
    const transaction = await contract.removeTodo(id);
    await transaction.wait();
  },

  toggleTodo: async (id) => {
    await requestAccount();
    const contract = getWriteContract();
    const transaction = await contract.toggleTodo(id);
    await transaction.wait();
  },

  getTodos: async () => {
    const contract = getReadContract();
    const todosCount = await contract.todoCount();
    const todos = [];

    for (let i = 0; i <= todosCount.toNumber(); i++) {
      const todo = await contract.todos(i);
      if (todo.id.toNumber() !== 0) {
        todos.push({
          id: todo.id.toNumber(),
          text: todo.text,
          completed: todo.completed,
        });
      }
    }
    return todos;
  },
};

export default blockchainService;
