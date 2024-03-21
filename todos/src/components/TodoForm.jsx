import React, { useState } from 'react';
import blockchainService from '../services/blockchainService';

const TodoForm = ({ contract, todosRefresh }) => {
  const [newTodo, setNewTodo] = useState('');

  const addNewTodo = async (text) => {
    if (!text.trim()) {
      alert('Please enter a valid todo.');
      return;
    }
    try {
      await blockchainService.createTodo(text, contract);
      todosRefresh();
    } catch (error) {
      alert(`Failed to add todo. Error: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTodo(newTodo);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Add To-do</button>
    </form>
  );
};

export default TodoForm;
