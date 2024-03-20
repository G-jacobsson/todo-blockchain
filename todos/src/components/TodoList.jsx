import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo }) => {
  return (
    <div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
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
