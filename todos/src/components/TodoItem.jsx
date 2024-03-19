import React from 'react';

const TodoItem = ({ todo }) => {
  return (
    <li>
      <div>
        <span>{todo.task}</span>
      </div>
    </li>
  );
};

export default TodoItem;
