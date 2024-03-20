import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <li>
      <div>
        <span>{todo.text}</span>
      </div>
    </li>
  );
};

export default TodoItem;
