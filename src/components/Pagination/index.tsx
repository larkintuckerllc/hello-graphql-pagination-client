import * as React from 'react';
import Todos from './Todos';

const FIRST = 3;

interface IPaginationState {
  after?: string;
  endCursor?: string;
  hasNextPage: boolean;
}

class Pagination extends React.Component<{}, IPaginationState> {
  public state: IPaginationState = {
    hasNextPage: false,
  };

  public render() {
    const { after, hasNextPage } = this.state;
    return (
      <div>
        <Todos
          first={FIRST}
          after={after}
          setPageInfo={this.setPageInfo}
        />
        <button
          disabled={!hasNextPage}
          onClick={this.handleNext}
        >Next</button>
      </div>
    );
  }

  private handleNext = () => {
    const { endCursor } = this.state;
    this.setState({
      after: endCursor,
      hasNextPage: false
    });
  }

  private setPageInfo = (hasNextPage: boolean, endCursor?: string) => {
    const { after } = this.state;
    this.setState({
      after,
      endCursor,
      hasNextPage,
    });
  };
}
export default Pagination;
