import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import {TYPE_DIRECTORY} from '../MenuType';
import './style.css'
import moment from 'moment';

const TodoItem = ({ content }) => {

    const dateFormat = "YYYY-MM-DD hh:mm";
   const  IconType =content.type===TYPE_DIRECTORY?'folder':'file';
   const color=content.type===TYPE_DIRECTORY?'#f60':'#1890ff';

   console.log(moment(content.createTime).format(dateFormat))

    return (
        <li className="todo-item">
        <div className='item-info'>
          <h4><Icon type={IconType}  style={{color:color}}/>&nbsp; {content.title}</h4>
          <time>{moment(content.createTime).format(dateFormat)}</time>
        </div>
        <div className="item-action">
          <Icon type="star"  theme="filled"  className="favorite"/>
        </div>
      </li>
    )
}

TodoItem.propTypes = {
    content: PropTypes.object.isRequired
}

export default TodoItem;