import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import Todo2 from './Todo2';

interface ITodo {
  id: string;
  title: string;
}

interface ITodosResult {
  todos: ITodo[];
  totalCount: number;
}

interface IData {
  allTodos?: ITodosResult;
}

interface ITodos2ViewProps {
  todos: ITodo[];
  error?: ApolloError;
  loading: boolean;
}

const DEFAULT_TODOS_RESULT = {
  todos: [],
  totalCount: 0,
};

const Todos2View = ({ todos, error, loading }: ITodos2ViewProps) => {
  if (loading) {
    return <div>LOADING</div>
  };
  if (error !== undefined) {
    return <div>ERROR</div>
  };
  return (
    <div>
      {todos.map((todo: ITodo) => (
        <Todo2
          key={todo.id}
          title={todo.title}
        />
      ))}
    </div>
  );
};

const GET_TODOS = gql`
  query {
    allTodos {
      todos {
        id
        title
      }
    }
  }
`;

class Todos2Query extends Query<IData, {}> {}

const Todos2 =  () => (
  <Todos2Query query={GET_TODOS}>
    {({ data = {
      allTodos: DEFAULT_TODOS_RESULT,
     }, error, loading }) => {
      if (data.allTodos === undefined) {
        data.allTodos = DEFAULT_TODOS_RESULT;
      }
      return (
        <Todos2View
          todos={data.allTodos.todos}
          error={error}
          loading={loading}
        />
      );
    }
  }
  </Todos2Query>
);

export default Todos2;
