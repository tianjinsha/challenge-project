import React, { Component } from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import * as State from '../../../common/StateConstant'
import { searchNote } from '../actions'

class SearchTodo extends Component {

    searchNote = (e) => {
        const { onSearchNote } = this.props;
        const value = e.currentTarget.value;
        setTimeout(() => onSearchNote(value), 200);
    }

    render() {
        const {current:{keyword}}=this.props;
        return (
            <Input
                placeholder="搜索……"
                value={keyword}
                allowClear
                onChange={this.searchNote}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
      current: state[State.CURRENT]
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchNote: (keyword) => {
            dispatch(searchNote(keyword))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTodo);