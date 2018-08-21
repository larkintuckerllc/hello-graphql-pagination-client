import * as React from 'react';
import Todos from './Todos';

const FIRST = 3;

interface IPaginationState {
  offset: number;
  totalCount: number;
}

class Pagination extends React.Component<{}, IPaginationState> {
  public state: IPaginationState = {
    offset: 0,
    totalCount: 0,
  };

  public render() {
    const { offset, totalCount } = this.state;
    return (
      <div>
        <Todos
          first={FIRST}
          offset={offset}
          setTotalCount={this.setTotalCount}
        />
        <button
          disabled={totalCount === 0 || offset === 0}
          onClick={this.handlePrevious}
        >Previous</button>
        <button
          disabled={totalCount === 0 || offset + FIRST >= totalCount}
          onClick={this.handleNext}
        >Next</button>
      </div>
    );
  }

  private handlePrevious = () => {
    const { offset, totalCount } = this.state;
    this.setState({
      offset: offset - FIRST,
      totalCount,
    });
  }

  private handleNext = () => {
    const { offset, totalCount } = this.state;
    this.setState({
      offset: offset + FIRST,
      totalCount,
    });
  }

  private setTotalCount = (totalCount: number) => {
    const { offset } = this.state;
    this.setState({
      offset,
      totalCount,
    });
  }
}
export default Pagination;
