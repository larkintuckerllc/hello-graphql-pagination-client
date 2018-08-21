import * as React from 'react';

interface ITodosCountProps {
  totalCount: number;
  setTotalCount(totalCount: number): void;
}

class TodosCount extends React.Component<ITodosCountProps, {}> {
  public componentDidUpdate(prevProps: ITodosCountProps) {
    const { setTotalCount, totalCount } = this.props;
    const prevTotalCount = prevProps.totalCount;
    if (prevTotalCount === 0 && totalCount !== 0) {
      setTotalCount(totalCount);
    }
  }

  public render() {
    return null;
  }
}

export default TodosCount;
