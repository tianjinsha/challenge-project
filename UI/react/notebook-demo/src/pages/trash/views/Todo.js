import React, { Component } from 'react';
import TodoList from './TodoList';
import Action from './Action'
import '../../../components/menu/style.css'

class Todo extends Component {

  render() {
    return (
      <div className="todo" >
        <Action/>
        <TodoList/>
      </div>
    )
  }
}

export default Todo;