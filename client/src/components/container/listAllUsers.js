import React, { Component } from "react";
import { FaUsers } from "react-icons/fa";
import User from "./user";
import { Link } from "react-router-dom";
class ListAllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], isLoading: true, errorMsg: "" };
  }

  componentWillMount() {}

  render() {
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
              <User
                name="Keanu Reeves"
                dob="1970-05-12"
                displayImgUrl="https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
              />
            </div>
            <div className="col">
              <User
                name="Sylvester Stallone"
                dob="1950-04-20"
                displayImgUrl="https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListAllUsers;
