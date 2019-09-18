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
      rename: false,
      title: content.title
    }
  }

  componentDidUpdate(prevProps,prevState){
    const rename_input=this.refs.rename_ref;
    if(this.state.rename && !isNull(rename_input)){
      rename_input.focus();
    }
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

  startRenameMenu = () => {
    this.setState({
      rename: true,
      actionShow: false
    })
  }

  toRenameMenu = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  finallRenameMenu=(e)=>{
    const {content,renameMenu}=this.props;
    this.setState({
      rename: false,
      actionShow: false
    })

    renameMenu(content.id,e.target.value);
  }

  rename_ref=(node)=>{
    this.Input=node;
  }

  render() {

    const {
      content, selected, toggleFavorite, intoMenu, intoNote, toggleRemoveMenu,
    } = this.props;

    const { actionShow, rename, title } = this.state;

    const dateFormat = "YYYY-MM-DD hh:mm";
    const IconType = content.type === TYPE_DIRECTORY ? 'folder' : 'file';
    const color = content.type === TYPE_DIRECTORY ? '#f60' : '#1890ff';
    const favoriteColor = content.favorite ? '#f60' : '#ccc';

    return (
      <li className="todo-item" onDoubleClick={intoMenu} onClick={intoNote} onMouseEnter={this.enterItem} onMouseLeave={this.outItem} style={{ background: selected ? "#eaf0fb" : "inherit" }}>
        <div className="item-header">
          <h4><Icon type={IconType} style={{ color: color }} />&nbsp;
          
            {
              rename ?  <Input size="small" className="rename-input" defaultValue={title} ref="rename_ref" onChange={this.toRenameMenu}  onBlur={this.finallRenameMenu} onPressEnter={this.finallRenameMenu}/> : title
            }
          </h4>
          {/* 动作操作 */}
          <ul className="item-action item-over" style={{ display: actionShow ? "flex" : "none" }}>
            {
              content.type === TYPE_FILE && <li className="action-icon action-star" title="收藏" style={{ color: favoriteColor }} onClick={toggleFavorite}><Icon type="star" theme={content.favorite ? "filled" : ""} /></li>
            }
            <li className="action-icon" onClick={this.startRenameMenu} title="重命名"><Icon type="edit" /></li>
            <li className="action-icon" onClick={toggleRemoveMenu} title="删除"><Icon type="delete" /></li>
          </ul>
          <ul className="item-action item-show" style={{ display: actionShow ? "none" : "flex" }}>
            {
              content.type === TYPE_FILE && content.favorite && <li className="action-icon action-star" style={{ color: favoriteColor }}><Icon type="star" theme="filled" /></li>
            }
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