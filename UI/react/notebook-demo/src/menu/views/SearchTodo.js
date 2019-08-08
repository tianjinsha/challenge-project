import React, { Component } from 'react';
import { Input } from 'antd';
const { Search } = Input;

class SearchTodo extends Component {

    render() {
        return (
            <Search
                placeholder="搜索……"
                onSearch={value => console.log(value)}
                style={{}}
            />
        )
    }
}

export default SearchTodo;