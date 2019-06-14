import React from "react";
import "./App.css";
import Header from "./components/header/header.js";
import ListAllUsers from "./components/container/listAllUsers";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="card m-2 p-2 border-0">
        <div className="row">
          <a href="/home" className="btn btn-info text-dark w-20">
            {" "}
            + Add User{" "}
          </a>
        </div>
        <ListAllUsers />
      </div>
    </div>
  );
}

export default App;
