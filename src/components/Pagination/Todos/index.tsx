import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import TodosPageInfo from './TodosPageInfo';
import TodosView from './TodosView';

export interface ITodo {
  id: string;
  title: string;
}

interface IEdge {
  node: ITodo;
}

interface IPageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}

interface ITodosResult {
  edges: IEdge[];
  pageInfo: IPageInfo;
}

interface IData {
  allTodosCursor?: ITodosResult;
}

interface ITodosProps {
  after?: string;
  first: number;
  setPageInfo(hasNextPage: boolean, endCursor?: string): void;
}

const GET_TODOS = gql`
  query TodosPage($after: String, $first: Int) {
    allTodosCursor(after: $after, first: $first ) {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

class TodosQuery extends Query<IData, {}> {}

const Todos = ({ after, first, setPageInfo }: ITodosProps) => (
  // HACK: NEED endCursor TO BE UNDEFINED
  /* tslint:disable */
  <TodosQuery
    query={GET_TODOS}
    variables={{
      after,
      first,
    }}
  >
    {({
      data: {
        allTodosCursor: {
          edges = [],
          pageInfo: {
            endCursor = undefined,
            hasNextPage = false
          } = {}
        } = {}
      } = {},
      error,
      loading,
    }) => {
      const todos = edges.map(edge => edge.node);
      return (
        <div>
          <TodosPageInfo
            endCursor={endCursor}
            hasNextPage={hasNextPage}
            setPageInfo={setPageInfo}
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
  /* tslint:enable*/
);

export default Todos;
