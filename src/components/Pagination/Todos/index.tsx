import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import TodosCount from './TodosCount';
import TodosView from './TodosView';

export interface ITodo {
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

interface ITodosProps {
  first: number;
  offset: number;
  setTotalCount(totalCount: number): void;
}

const DEFAULT_TODOS_RESULT = {
  todos: [],
  totalCount: 0,
};

const GET_TODOS = gql`
  query TodosPage($first: Int, $offset: Int) {
    allTodos(first: $first, offset: $offset) {
      todos {
        id
        title
      }
      totalCount
    }
  }
`;

class TodosQuery extends Query<IData, {}> {}

const Todos = ({ first, offset, setTotalCount }: ITodosProps) => (
  <TodosQuery
    query={GET_TODOS}
    variables={{
      first,
      offset,
    }}
  >
    {({ data = {
      allTodos: DEFAULT_TODOS_RESULT,
     }, error, loading }) => {
      if (data.allTodos === undefined) {
        data.allTodos = DEFAULT_TODOS_RESULT;
      }
      return (
        <div>
          <TodosCount
            setTotalCount={setTotalCount}
            totalCount={data.allTodos.totalCount}
          />
          <TodosView
            error={error !== undefined}
            loading={loading}
            todos={data.allTodos.todos}
          />
        </div>
      );
    }
  }
  </TodosQuery>
);

export default Todos;
