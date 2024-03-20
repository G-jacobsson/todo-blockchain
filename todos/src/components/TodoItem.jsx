import React from 'react';
import { MdClose } from 'react-icons/md';

const TodoItem = ({ todo, deleteTodo, onToggle }) => {
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
            onChange={() => onToggle(todo.id)}
          />
          <label>{todo.completed ? '(Completed)' : '(Not Completed)'}</label>
          <MdClose onClick={() => deleteTodo(todo.id)} />
        </div>
      </li>
    </>
  );
};

export default TodoItem;
