import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { toggleFavorite } from '../actions';
import { toggleMenu, toggleNote } from '../../filter/actions';
import { Icon } from 'antd';
import { TYPE_DIRECTORY, TYPE_FILE } from '../MenuType'
import * as State from '../../common/StateConstant'
import { isNull } from '../../common/Util'
import './style.css'

class TodoList extends Component {

  intoMenu = (currentMenu) => {
    const {
      onToggleMenu,
      currentMenu: { depth }
    } = this.props;

    if (currentMenu.type === TYPE_DIRECTORY) {
      onToggleMenu(depth + 1, currentMenu.id, currentMenu);
    }
  }

  intoNote = (id, type) => {
    const { notes, onToggleNote } = this.props;
    let note=[];
    if (type === TYPE_FILE) {
      note= notes.filter(item =>{
        return  item.id === id;
      });
      if (note.length === 1) {
        onToggleNote(note[0].id)
      }
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
              intoNote={() => this.intoNote(item.id, item.type)}
            />
          ))
        }
      </ul>
    );
  }
}

const setVisiableTodos = (todos, filter) => {
  let currentMenuId = "";
  if (!isNull(filter.currentMenu)) {
    currentMenuId = filter.currentMenu.id;
  }
  return todos.filter(item => item.parentId === currentMenuId)
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: setVisiableTodos(state[State.MENUS], state[State.CURRENT]),
    notes: state[State.NOTES],
    currentMenu: state[State.CURRENT]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFavorite: id => {
      dispatch(toggleFavorite(id));
    },
    onToggleMenu: (depth, currentMenuId, currrentMenu) => {
      dispatch(toggleMenu(depth, currentMenuId, currrentMenu))
    },
    onToggleNote: (currentNoteId) => {
      dispatch(toggleNote(currentNoteId))
    }
  };
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);