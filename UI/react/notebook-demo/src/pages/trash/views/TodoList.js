import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import {  toggleRemoveMenu,deleteMenu } from '../../../components/menu/actions';
import { toggleMenu, toggleNote } from '../../../components/filter/actions';
import {removeNote} from '../../../components/edit/actions'
import { TYPE_DIRECTORY, TYPE_FILE } from '../../../components/menu/MenuType'
import * as State from '../../../common/StateConstant'
import { isNull, isStringNull } from '../../../common/Util';
import { choseFirstNote } from '../../../components/menu/common';
import '../../../components/menu/style.css';

class TodoList extends Component {

  compareWithType = (obj1, obj2) => {
    let val1 = obj1.type;
    let val2 = obj2.type;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }

  compareWithDate = (obj1, obj2) => {
    let val1 = obj1.createTime;
    let val2 = obj2.createTime;
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  }


  intoMenu = (currentMenu) => {
    const {
      onToggleMenu,
      onToggleNote,
      todos,
      current: { depth }
    } = this.props;

    if (currentMenu.type === TYPE_DIRECTORY) {
      onToggleMenu(depth + 1, currentMenu.id, currentMenu);
      let nextNoteId = choseFirstNote(todos, currentMenu.id);
      onToggleNote(nextNoteId);
    }
  }

  intoNote = (id, type) => {
    const { notes, onToggleNote } = this.props;
    let note = [];
    if (type === TYPE_FILE) {
      note = notes.filter(item => {
        return item.id === id;
      });
      if (note.length === 1) {
        onToggleNote(note[0].id)
      }
    }
  }

  deleteMenu=(id)=>{
    const {onDeleteMenu,onDeleteNote}=this.props;
    onDeleteMenu(id);
    onDeleteNote(id);
  }


  render() {
    const {
      currentTodos,
      onToggleRemoveMenu,
      current: { keyword, currentNoteId }
    } = this.props;

    let filterTodos = currentTodos;

    if (!isStringNull(keyword)) {
      filterTodos = currentTodos.filter(item => {
        let m = item.title.match(new RegExp(keyword, 'g'));
        if (m === null) {
          return false;
        }
        return m.length > 0;
      })
    }


    return (
      <div className="list-wrap">
        <ul className="todo-list">
          {
            filterTodos.filter(item => (item.deleted)).sort(this.compareWithType).map(item => (
              <TodoItem
                key={item.id}
                content={item}
                selected={item.id === currentNoteId}
                intoMenu={() => this.intoMenu(item)}
                intoNote={() => this.intoNote(item.id, item.type)}
                deleteMenu={()=>this.deleteMenu(item.id)}
                toggleRemoveMenu={() => onToggleRemoveMenu(item.id, item.deleted)}
              />
            ))
          }
        </ul>
      </div>
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
    todos: state[State.MENUS],
    currentTodos: setVisiableTodos(state[State.MENUS], state[State.CURRENT]),
    notes: state[State.NOTES],
    current: state[State.CURRENT]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleMenu: (depth, currentMenuId, currrentMenu) => {
      dispatch(toggleMenu(depth, currentMenuId, currrentMenu))
    },
    onToggleNote: (currentNoteId) => {
      dispatch(toggleNote(currentNoteId))
    },
    onToggleRemoveMenu: (id, deleted) => {
      dispatch(toggleRemoveMenu(id, deleted));
    },
    onDeleteMenu:(id)=>{
      dispatch(deleteMenu(id));
    },
    onDeleteNote:(id)=>{
      dispatch(removeNote(id))
    }
  };
};

TodoList.propTypes = {
  currentTodos: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);