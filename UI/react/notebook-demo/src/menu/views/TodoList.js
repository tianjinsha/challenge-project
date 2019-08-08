import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import {Icon} from 'antd'
import './style.css'

const TodoList = ({ todos = [] }) => {
  return (
    <ul className="todo-list">
      <li className="todo-item">
        <div className='item-info'>
          <h4> <Icon type="file"  theme="twoTone"/>&nbsp;欢迎使用笔记</h4>
          <time>2018-12-12 12:14</time>
        </div>
        <div className="item-action">
          <Icon type="star"  theme="filled"  className="favorite"/>
        </div>
      </li>
      {
        todos.map(item => (
          <TodoItem
            key={item.id}
            content={item}
          />
        ))
      }
    </ul>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    todos: state.menu
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(TodoList);