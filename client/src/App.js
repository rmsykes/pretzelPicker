import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import SinglePretzel from './components/SinglePretzelPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/:pretzelId" component={SinglePretzel}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
