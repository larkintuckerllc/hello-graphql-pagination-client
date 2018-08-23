import * as React from 'react';

interface ITodosPageInfoProps {
  endCursor?: string;
  hasNextPage: boolean;
  setPageInfo(hasNextPage: boolean, endCursor?: string): void;
}

class TodosPageInfo extends React.Component<ITodosPageInfoProps, {}> {
  public componentDidUpdate(prevProps: ITodosPageInfoProps) {
    const { endCursor, hasNextPage, setPageInfo } = this.props;
    const prevEndCursor = prevProps.endCursor;
    const prevHasNextPage = prevProps.hasNextPage;
    if (endCursor === prevEndCursor && hasNextPage === prevHasNextPage) {
      return;
    }
    setPageInfo(hasNextPage, endCursor);
  }

  public render() {
    return null;
  }
}

export default TodosPageInfo;