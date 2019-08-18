import React from 'react';
import './App.css';
import Menu from './layout/Menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Help from './pages/Help';
import Topics from './pages/Topics';
import NotFound from './pages/404'

function App() {
  return (
    <div className="App">

      <Router>
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
      </Router>
    </div>
  );
}

export default App;
