import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import UserRepos from "./components/UserRepos";
import { Helmet } from "react-helmet";

function App() {
  return (
    <Router>
      <Helmet>
        <style>{"body { background-color: #f4f4f5; }"}</style>
      </Helmet>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/users/:id/repos" children={UserRepos} />
      </Switch>
    </Router>
  );
}

export default App;
