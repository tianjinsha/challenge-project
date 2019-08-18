import React from 'react';
import Backup from '../../../components/backupTodo/Backup'
import { view as SearchTodo } from '../../../components/filter'

const Action = () => {
  return (
    <div className="action-wrap">
      <Backup/>
      &nbsp;
      <SearchTodo />
    </div>
  )
}

export default Action;