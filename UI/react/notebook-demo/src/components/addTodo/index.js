import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, Dropdown } from 'antd';
import AddTodoModel from './AddTodoModal'
import * as MenuType from '../menu/MenuType'
import * as State from '../../common/StateConstant'
import { connect } from 'react-redux';
import { addMenu } from '../menu/actions';
import { addNote } from '../edit/actions';
import { toggleNote } from '../filter/actions';
import { uuid } from '../../common/Util'

const menu = ({ handler }) => {
  return (
    <Menu>
      <Menu.Item key="0">
        <Button type="link" icon="folder-add" onClick={() => handler(MenuType.TYPE_DIRECTORY, '新建文件夹')}>新建文件夹</Button>
      </Menu.Item>
      <Menu.Item key="1">
        <Button type="link" icon="file-add" onClick={() => handler(MenuType.TYPE_FILE, '新建笔记')}>新建笔记</Button>
      </Menu.Item>
    </Menu>
  )
}

class AddTodo extends Component {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      modalTitle: '新建',
      type: MenuType.TYPE_FILE
    }
  }

  addNew = (type, title) => {
    this.setState({
      modalVisible: true,
      modalTitle: title,
      type: type
    });
  }

  handleSubmit = (inputValue) => {
    const {
      currentMenu = '',
      onAddMenu,
      onAddNote,
      onToggleNote
    } = this.props;
    const { type } = this.state;
    const id = uuid();
    if (!inputValue.trim()) {
      return;
    }
    onAddMenu(id, inputValue, type, currentMenu.currentMenuId);
    if (type === MenuType.TYPE_FILE) {
      onAddNote(id, inputValue, "");
      onToggleNote(id);
    }

    this.setState({
      type: MenuType.TYPE_FILE,
      modalVisible: false,
    });
  }

  cancelHandle = () => {
    this.setState({
      type: MenuType.TYPE_FILE,
      modalVisible: false,
    });
  }

  render() {
    const {
      modalVisible,
      modalTitle,
    } = this.state

    const parentProps = {
      modalVisible: modalVisible,
      modalTitle: modalTitle,
    }

    const parentMethod = {
      handleModalVisible: this.cancelHandle,
      handleSubmit: this.handleSubmit
    }

    return (
      <div>
        <Dropdown overlay={menu({ handler: this.addNew })} trigger={['click']}>
          <Button icon="plus" title="新建"></Button>
        </Dropdown>
        <AddTodoModel
          {...parentProps}
          {...parentMethod}
        />
      </div>
    )
  }
}

AddTodo.propTypes = {
  onAddMenu: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    currentMenu: state[State.CURRENT]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddMenu: (id, title, type, parentId = '') => {
      dispatch(addMenu(id, title, type, parentId));
    },
    onAddNote: (id, title, content) => {
      dispatch(addNote(id, title, content))
    },
    onToggleNote: (currentNoteId) => {
      dispatch(toggleNote(currentNoteId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);