import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => {
  return (
    <div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      ) : (
        <p>No to-dos yet!</p>
      )}
    </div>
  );
};

export default TodoList;
