import * as React from 'react';

interface ITodo2Props {
  title: string;
}

const Todo2 = ({ title }: ITodo2Props) => <div>{title}</div>;

export default Todo2;