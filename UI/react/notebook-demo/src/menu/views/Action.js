import React from 'react';
import AddTodo from './AddTodo';
import Backup from './Backup'
import {view as SearchTodo} from '../../filter'

const Action = () => {
  return (
    <div  className="action-wrap">
      <Backup/>
      &nbsp;
      <SearchTodo/>
      &nbsp;
       <AddTodo />
    </div>
  )
}

export default Action;