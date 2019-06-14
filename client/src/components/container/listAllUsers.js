import React, { Component } from "react";
import User from "../card/user";
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
        <h4>List ALL USERS</h4>
        <div className="card m-2 p-2">
          <div className="row">
            <div className="col">
              <User
                name="Keanu Reeves"
                dob="1970-05-12"
                displayImgUrl="http://img.com"
              />
            </div>
            <div className="col">
              <User
                name="Sylvester Stallone"
                dob="1950-04-20"
                displayImgUrl="http://img.com"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListAllUsers;
