import React, { Component } from 'react';
import { view as EditView } from '../../components/edit'
import  Todo   from './views/Todo.js';
import './folder.css'

class Folder extends Component {
    render() {
        return (
            <section className="content-folder">
                <div className="left-wrapper">
                    <Todo />
                </div>
                <div className="right-wrapper">
                        <EditView />
                </div>
            </section>
        )
    }
}

export default Folder;