import React from 'react';
import AddTodo from './AddTodo';
import SearchTodo from './SearchTodo';
import Backup from './Backup'

const Action = () => {
  return (
    <div  className="action-wrap">
      <Backup/>
      &nbsp;
      <SearchTodo />
      &nbsp;
       <AddTodo />
    </div>
  )
}

export default Action;