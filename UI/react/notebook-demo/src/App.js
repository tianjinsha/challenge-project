import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuContent from './layout/MenuContext';
import HeaderView from './layout/HeaderView';
import { view as EditView } from './edit'
import { view as MenuView } from './menu'
import './App.css';
import { hidden } from 'ansi-colors';
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="wrapper" >
          <MenuContent className="left-wrapper" />
          <div className="right-wrapper">
            <HeaderView className="content-header" />
            <Layout className="content">
              <Content style={{ display: 'flex', position: "absolute", top: "5px", bottom: "5px", overflow: "hidden" ,flex:"1 1 auto",width:"100%"}}>
                <MenuView />
                <EditView />
              </Content>

            </Layout>
            <Footer style={{ textAlign: 'center' }} className="content-footer">TODO Design ©2019 Created by tjshan</Footer>

          </div>
          {/* <Layout className=""> */}

          {/* <HeaderView className="headerView" />
            <Layout className="content">
              <Content style={{ margin: '5px 0', padding: '0 15px' }}>
                <div style={{ display: 'flex' }}>
                  <MenuView />
                  <EditView />
                </div>
              </Content>
            </Layout> */}
          {/* <Footer style={{ textAlign: 'center' }}>TODO Design ©2019 Created by tjshan</Footer> */}
          {/* </Layout> */}
        </div>
      </div>
    );
  }
}

export default App;
