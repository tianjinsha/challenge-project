import React from 'react';
import AddTodo from '../../../components/addTodo';
import Backup from '../../../components/backupTodo/Backup'
import { view as SearchTodo } from '../../../components/filter'

const Action = () => {
  return (
    <div className="action-wrap">
      <Backup/>
      &nbsp;
      <SearchTodo />
      &nbsp;
       <AddTodo />
    </div>
  )
}

export default Action;