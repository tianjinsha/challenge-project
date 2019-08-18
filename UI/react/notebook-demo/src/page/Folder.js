import React, { Component } from 'react';
import { view as EditView } from '../edit'
import { view as MenuView } from '../menu'
import './Folder.css'

class Folder extends Component {
    render() {
        return (
            <section className="content-folder">
                <div className="left-wrapper">
                    <MenuView />
                </div>
                <div className="right-wrapper">
                        <EditView />
                </div>
            </section>
        )
    }
}

export default Folder;