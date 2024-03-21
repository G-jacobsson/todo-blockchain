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
      <li className="list-item">
        <div className="item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            className="todo-text"
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              fontWeight: todo.completed ? '200' : 'bold',
            }}
          >
            {todo.text}
          </span>
          <label>{todo.completed ? '(Completed)' : '(Not Completed)'}</label>
          <MdClose
            className="delete-btn"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      </li>
    </>
  );
};

export default TodoItem;
