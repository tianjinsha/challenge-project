import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuContent from './layout/MenuContext';
import HeaderView from './layout/HeaderView';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
// import Routes from './Routes';
import User from './page/User';
import Trash from './page/Trash';
import Folder from './page/Folder';
import Home from './page/Home';
import Star from './page/Star';
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
                  <Route path="trash" component={Trash} />
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
