import * as React from 'react';
import { ITodo } from '../';
import Todo from './Todo';

interface ITodosViewProps {
  error: boolean;
  loading: boolean;
  todos: ITodo[];
}

const TodosView = ({ error, loading, todos }: ITodosViewProps) => {
  if (loading) {
    return <div>LOADING</div>
  };
  if (error) {
    return <div>ERROR</div>
  };
  return (
    <div>
      {todos.map((todo: ITodo) => (
        <Todo
          key={todo.id}
          title={todo.title}
        />
      ))}
    </div>
  );
};

export default TodosView;
