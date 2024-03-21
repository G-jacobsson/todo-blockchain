import React from 'react';
import { MdClose } from 'react-icons/md';
import blockchainService from '../services/blockchainService';

const TodoItem = ({ todo, contract, todosRefresh }) => {
  const deleteTodo = async (id) => {
    await blockchainService.removeTodo(id, contract);
    todosRefresh();
  };

  const toggleTodo = async (id) => {
    await blockchainService.toggleTodo(id, contract);
    todosRefresh();
  };

  return (
    <>
      <li>
        <div>
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <label>{todo.completed ? '(Completed)' : '(Not Completed)'}</label>
          <MdClose onClick={() => deleteTodo(todo.id)} />
        </div>
      </li>
    </>
  );
};

export default TodoItem;
