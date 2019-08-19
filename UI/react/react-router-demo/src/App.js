import React from 'react';
import './App.css';
import Menu from './layout/Menu';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { ConnectedRouter } from 'connected-react-router'
import Index from './pages/Index';
import About from './pages/About';
import Help from './pages/Help';
import Topics from './pages/Topics';
import NotFound from './pages/404';


const browserHistory = createBrowserHistory()



function App() {


  return (
    <div className="App">

      <ConnectedRouter history={browserHistory}>
        <header className="App-header">
          <Menu />
        </header>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Route path="/topics" component={Topics} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
