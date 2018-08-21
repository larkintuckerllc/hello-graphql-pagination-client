import * as React from 'react';

interface ITodoProps {
  title: string;
}

const Todo = ({ title }: ITodoProps) => <div>{title}</div>;

export default Todo;