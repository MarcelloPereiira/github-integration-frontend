import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import UserRepos from './components/UserRepos';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={Home}/>
        <Route path="/user/:id/repos" children={UserRepos}/>
      </Switch>
    </Router>
  );
}

export default App;
