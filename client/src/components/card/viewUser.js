import React, { Component } from "react";
import { FaRegEdit, FaUserSlash } from "react-icons/fa";
class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver(event) {
    this.setState({ hover: true });
  }
  onMouseOut(event) {
    this.setState({ hover: false });
  }

  render() {
    const hoverDisplay = this.state.hover
      ? { display: "block" }
      : { display: "none" };
    return (
      <div
        className="card m-2 p-2 "
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className="row p-2 m-2 mr-0">
          <div className="col">
            <img
              src={this.props.displayImgUrl}
              alt="User's Avatar"
              className="border-0 border-dark"
            />{" "}
          </div>
          <div className="col mt-4 ml-0">
            <h2>{this.props.name}</h2>
            <h2>{this.props.dob}</h2>
          </div>
        </div>
        <div className="row">
          <div className="m-2 p-2 float-right" style={hoverDisplay}>
            <input
              value="Edit"
              type="button"
              className="btn btn-primary btn-sm mt-1"
              onClick={this.props.handleEditClick}
            />

            <input
              value="Delete"
              type="button"
              className="btn btn-danger btn-sm mt-1 ml-2"
              onClick={this.props.handleDeleteClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUser;
