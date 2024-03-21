import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, todosRefresh, contract }) => {
  return (
    <div>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              todosRefresh={todosRefresh}
              contract={contract}
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
