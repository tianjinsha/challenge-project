import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { toggleFavorite } from '../actions';
import { toggleMenu } from '../../filter/actions';
import { Icon } from 'antd';
import { TYPE_DIRECTORY, TYPE_FILE } from '../MenuType'
import * as State from '../../common/StateConstant'
import {isNull} from '../../common/Util'
import './style.css'

class TodoList extends Component {

  intoMenu = (current) => {
    console.log(current)
    const {
      onToggleMenu,
      currentMenu: { depth }
    } = this.props;

    if (current.type === TYPE_DIRECTORY) {
      onToggleMenu(depth + 1, current.id, current);
    }
  }

  render() {
    const {
      todos,
      onFavorite
    } = this.props
    return (
      <ul className="todo-list">
        <li className="todo-item">
          <div className='item-info'>
            <h4> <Icon type="file" theme="twoTone" />&nbsp;欢迎使用笔记</h4>
            <time>2018-12-12 12:14</time>
          </div>
          <div className="item-action">
            <Icon type="star" theme="filled" className="favorite" />
          </div>
        </li>
        {
          todos.map(item => (
            <TodoItem
              key={item.id}
              content={item}
              toggleFavorite={() => onFavorite(item.id)}
              intoMenu={() => this.intoMenu(item)}
            />
          ))
        }
      </ul>
    );
  }
}

const setVisiableTodos = (todos, filter) => {
  // debugger;
  console.log(filter)
  let currentId="";
  if(!isNull(filter.current)){
      currentId=filter.current.id;
  }

  console.log("currentId::"+currentId)
  return todos.filter(item => item.parentId === currentId)
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: setVisiableTodos(state[State.MENUS], state[State.CURRENT_MENU]),
    currentMenu: state[State.CURRENT_MENU]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFavorite: id => {
      dispatch(toggleFavorite(id));
    },
    onToggleMenu: (depth, currentId, currrent) => {
      dispatch(toggleMenu(depth, currentId, currrent))
    }
  };
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);