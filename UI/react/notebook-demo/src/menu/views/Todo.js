import React, { Component } from 'react';
import TodoList from './TodoList';
import Action from './Action'

class Todo extends Component {

  render() {
    return (
      <div style={{ background: '#f9f9f9', minHeight: 480 }}>
        <Action/>
        <TodoList/>
      </div>
    )
  }
}

export default Todo;