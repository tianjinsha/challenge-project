import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuContent from './layout/MenuContext';
import HeaderView from './layout/HeaderView';
import { view as EditView } from './edit'
import { view as MenuView } from './menu'
import './App.css';
const {    Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="container">
        <MenuContent className="left-wrapper" />
        <div className="wrapper">
          <div className="content">
            {/* header */}
            <HeaderView className="content-header" />
            <div className="content-selection">
              <div className="left-wrapper">
                <MenuView />
              </div>
              <div className="right-wrapper">
                <div className="edit-wrapper">
                  <EditView />
                </div>
              </div>
            </div>
            {/* footer */}
            <Footer className="content-footer">TODO Design ©2019 Created by tjshan</Footer>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
