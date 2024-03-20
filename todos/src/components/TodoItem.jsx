import React from 'react';

const TodoItem = ({ todo, deleteTodo, onToggle }) => {
  return (
    <>
      <li>
        <div>
          <span
            onClick={() => deleteTodo(todo.id)}
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
        </div>
      </li>
    </>
  );
};

export default TodoItem;
