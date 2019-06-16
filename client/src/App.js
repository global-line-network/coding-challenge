import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import ListAllUsers from "./components/container/listAllUsers";
import CreateUser from "./components/container/createUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route exact path="/createUser" component={CreateUser} />
          <Route path="/" component={ListAllUsers} />
        </Switch>
      </Router>
      <div className="d-block text-dark m-2">
        ***Create using React,Node and Mysql
      </div>
    </div>
  );
}

export default App;
