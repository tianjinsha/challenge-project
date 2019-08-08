import React from 'react';
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';

const Action = () => {
  return (
    <div  className="action-wrap">
      <SearchTodo />
      &nbsp;
       <AddTodo />
    </div>
  )
}

export default Action;