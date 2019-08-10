import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { TYPE_DIRECTORY, TYPE_FILE } from '../MenuType';
import './style.css'
import moment from 'moment';

const TodoItem = ({ content, toggleFavorite, intoMenu,intoNote }) => {

  const dateFormat = "YYYY-MM-DD hh:mm";
  const IconType = content.type === TYPE_DIRECTORY ? 'folder' : 'file';
  const color = content.type === TYPE_DIRECTORY ? '#f60' : '#1890ff';
  const favoriteColor = content.favorite ? '#f30' : '#ccc';

  return (
    <li className="todo-item" onDoubleClick={intoMenu} onClick={intoNote}>
      <div className='item-info'>
        <h4><Icon type={IconType} style={{ color: color }} />&nbsp; {content.title}</h4>
        <time>{moment(content.createTime).format(dateFormat)}</time>
      </div>
      <div className="item-action">
        {
          content.type === TYPE_FILE && <Icon type="star" theme="filled" style={{ color: favoriteColor }} className="favorite" onClick={toggleFavorite} />
        }
      </div>
    </li>
  )
}

TodoItem.propTypes = {
  content: PropTypes.object.isRequired
}

export default TodoItem;