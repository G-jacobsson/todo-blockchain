import { ethers } from 'ethers';
import { address, ABI } from '../config';

const getProvider = () => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    console.error('Metamask not found');
    return null;
  }
};

export const getTodos = async () => {
  const provider = getProvider();
  const contract = new ethers.Contract(address, ABI, provider);

  const todosCount = await contract.todoCount();
  const todos = [];

  for (let i = 1; i <= todosCount.toNumber(); i++) {
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
};
