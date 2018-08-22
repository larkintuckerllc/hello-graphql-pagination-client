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
    {({ data: { allTodos: { todos = [], totalCount = 0 } = {} } = {}, error, loading }) => {
      return (
        <div>
          <TodosCount
            setTotalCount={setTotalCount}
            totalCount={totalCount}
          />
          <TodosView
            error={error !== undefined}
            loading={loading}
            todos={todos}
          />
        </div>
      );
    }
  }
  </TodosQuery>
);

export default Todos;
