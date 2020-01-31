import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AllPretzels from './components/AllPretzels.jsx'
import SinglePretzel from './components/SinglePretzel.jsx'
import AllUsers from './components/AllUsers.jsx'
import OneUser from './components/OneUser.jsx'


import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/user" component={AllUsers}/>
          <Route exact path="/user/:userId" component={OneUser}/>
          
          <Route exact path="/pretzel" component={AllPretzels}/>
          <Route exact path="/pretzel/:pretzelId" component={SinglePretzel}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
