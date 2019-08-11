import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as State from '../../common/StateConstant';
import { toggleMenu } from '../../filter/actions'
import {isNull} from '../../common/Util'

class Backup extends Component {
    outMenu = () => {
        const {
            onToggleMenu,
            parent,
            currentMenu: { depth }
        } = this.props;

        if(depth===0){
            return;
        }
        let parentId='';
        if(!isNull(parent)){
            parentId=parent.parentId;
        }

        onToggleMenu(depth - 1, parentId, parent);
    }
    render() {
        const {
             currentMenu: { depth }
        }=this.props

        return (
            <Button icon="rollback" disabled={depth===0} onClick={() => this.outMenu()} title="返回上一级"></Button>
        )
    }
}

const setVisiableTodos = (todos, filter) => {
    let parentId = '';
    if (filter.currentMenu !== null) {
        parentId = filter.currentMenu.parentId;
    }
    return todos.filter(item => item.id === parentId)
}

const mapStateToProps = (state) => {
    const arr = setVisiableTodos(state[State.MENUS], state[State.CURRENT]);
    let parentMenu = null;
    if (arr !== null && arr !== undefined && arr.length > 0) {
        parentMenu = arr[0];
    }

    return {
        parent: parentMenu,
        currentMenu: state[State.CURRENT]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMenu: (depth, currentMenuId, currrent) => {
            dispatch(toggleMenu(depth, currentMenuId, currrent))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Backup);