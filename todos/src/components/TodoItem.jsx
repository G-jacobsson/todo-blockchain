import React from 'react';

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li>
      <div>
        <span onClick={() => deleteTodo(todo.id)}>{todo.text}</span>
      </div>
    </li>
  );
};

export default TodoItem;
