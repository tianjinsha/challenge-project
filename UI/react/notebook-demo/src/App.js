import React, { Component } from 'react';
import { Layout  } from 'antd';
import MenuContent from './layout/MenuContext';
import HeaderView from './layout/HeaderView';
import { view as EditView } from './edit'
import { view as MenuView } from './menu'
import './App.css';
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MenuContent />
        <Layout>
          <HeaderView />
          <Layout>
            <Content style={{ margin: '5px 0',padding:'0 15px', }}>
              <div style={{ display: 'flex' }}>
                <MenuView />
                <EditView />
              </div>

            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>TODO Design ©2019 Created by tjshan</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
