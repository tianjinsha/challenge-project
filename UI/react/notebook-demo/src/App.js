import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuContent from './layout/MenuContext';
import HeaderView from './layout/HeaderView';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
// import Routes from './Routes';
import User from './pages/User';
import Trash from './pages/trash';
import Folder from './pages/folder';
import Home from './pages/Home';
import Star from './pages/star';
import './App.css';
const { Footer } = Layout;


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <MenuContent className="left-wrapper" />
          <div className="wrapper">
            <div className="content">
              {/* header */}
              <HeaderView className="content-header" />
              <div className="content-postion">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/user" component={User} />
                  <Route path="/trash" component={Trash} />
                  <Route path="/folder" component={Folder} />
                  <Route path="/star" component={Star} />
                </Switch>
              </div>
              {/* footer */}
              <Footer className="content-footer">TODO Design ©2019 Created by tjshan</Footer>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
