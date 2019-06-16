import React, { Component } from "react";
import { FaUsers } from "react-icons/fa";
import User from "./user";
import { Link } from "react-router-dom";
import axios from "axios";
class ListAllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], isLoading: true, message: "" };
  }

  componentDidMount() {
    fetch("/api/getAllUsers")
      .then(response => {
        console.log(response);
        if (response.status === 200) return response.json();
        else
          return {
            message: "NODE CONNECTION ERROR",
            users: [],
            isLoading: false
          };
      })
      .then(data => {
        console.log(data);
        this.setState({
          message: data.message,
          users: data.users,
          isLoading: false
        });
      });
  }

  getOddEvenIndexUser(users, type) {
    let i,
      arr = [];
    if (type === "even") i = 0;
    else i = 1;

    while (i < users.length) {
      arr.push(users[i]);
      i = i + 2;
    }
    return arr;
  }

  render() {
    const { message, isLoading, users } = this.state;
    const oddIndexUserArray = this.getOddEvenIndexUser(users, "odd");
    const evenIndexUserArray = this.getOddEvenIndexUser(users, "even");

    if (isLoading) {
      return (
        <div className="m-4 p-4 text-dark">
          {" "}
          <h4> LOADING .... </h4>
        </div>
      );
    } else if (message === "NODE CONNECTION ERROR") {
      return (
        <div className="m-4 p-4 text-danger">
          <h3>NODE SERVER IS DOWN. PLEASE BRING IT UP AND TRY AGAIN! </h3>
        </div>
      );
    } else {
      return (
        <div>
          {" "}
          <h3 className="m-2 p-2">
            <FaUsers /> <b> User Accounts </b>
          </h3>
          <div className="d-block m-2 p-2">
            <Link to="/createUser" className="btn btn-info text-dark w-20">
              {" "}
              <b>+ Add User </b>
            </Link>
          </div>
          <div className="card m-2 p-2 border-dark">
            <div className="row">
              <div className="col">
                {evenIndexUserArray.map((user, i) => (
                  <User
                    key={i}
                    id={user.id}
                    name={user.name}
                    dob={user.dob}
                    displayImgUrl={user.displayImgUrl}
                  />
                ))}
              </div>
              <div className="col">
                {oddIndexUserArray.map((user, i) => (
                  <User
                    key={i}
                    id={user.id}
                    name={user.name}
                    dob={user.dob}
                    displayImgUrl={user.displayImgUrl}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ListAllUsers;
