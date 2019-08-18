import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'antd';
import { TYPE_DIRECTORY, TYPE_FILE } from '../../../components/menu/MenuType';
import { isNull, } from '../../../common/Util';
import moment from 'moment';
import '../../../components/menu/style.css';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    const { content } = props;
    this.state = {
      actionShow: false,
      title: content.title
    }
  }

  componentDidUpdate(prevProps,prevState){
  }

  enterItem = () => {
    if(!this.state.rename){
      this.setState({
        actionShow: true
      })
    }
  }
  outItem = () => {
    this.setState({
      actionShow: false
    })
  }


  render() {

    const {
      content, selected, intoMenu, intoNote, toggleRemoveMenu,deleteMenu
    } = this.props;

    const { actionShow, title } = this.state;

    const dateFormat = "YYYY-MM-DD hh:mm";
    const IconType = content.type === TYPE_DIRECTORY ? 'folder' : 'file';
    const color = content.type === TYPE_DIRECTORY ? '#f60' : '#1890ff';

    return (
      <li className="todo-item" onDoubleClick={intoMenu} onClick={intoNote} onMouseEnter={this.enterItem} onMouseLeave={this.outItem} style={{ background: selected ? "#eaf0fb" : "inherit" }}>
        <div className="item-header">
          <h4><Icon type={IconType} style={{ color: color }} />&nbsp;{title}
          </h4>
          {/* 动作操作 */}
          <ul className="item-action item-over" style={{ display: actionShow ? "flex" : "none" }}>
            <li className="action-icon" onClick={toggleRemoveMenu} title="撤销"><Icon type="undo" /></li>
            <li className="action-icon" onClick={deleteMenu} title="删除"><Icon type="delete" /></li>
          </ul>
          <ul className="item-action item-show" style={{ display: actionShow ? "none" : "flex" }}>
          </ul>
        </div>
        <div className="item-footer"><time>{moment(content.createTime).format(dateFormat)}</time></div>
      </li>
    )
  }
}

TodoItem.propTypes = {
  content: PropTypes.object.isRequired
}

export default TodoItem;