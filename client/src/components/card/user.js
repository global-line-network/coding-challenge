import React, { Component } from "react";
import ViewUser from "./viewUser";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      name: props.name,
      dob: props.dob,
      displayImgURL: props.displayImgURL
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }
  handleEditClick(event) {
    console.log("EDIT CLICKED");
    this.setState({ editMode: true });
  }

  handleDeleteClick(event) {
    console.log("DELETE CLICKED");
  }

  handleValueChange(event) {
    this.setValue({ [event.target.name]: event.target.value });
  }

  handleCancelClick(event) {
    console.log("Cancel clicked " + this.state.editMode);
    this.setState({
      editMode: false,
      name: this.props.name,
      dob: this.props.dob,
      displayImgURL: this.props.displayImgURL
    });
  }

  handleUpdateClick(event) {
    console.log("UPDATE CLICKED");
  }

  render() {
    if (!this.state.editMode) {
      return (
        <ViewUser
          name={this.state.name}
          dob={this.state.dob}
          displayImgURL={this.state.displayImgURL}
          handleEditClick={this.handleEditClick}
          handleDeleteClick={this.handleDeleteClick}
        />
      );
    } else {
      return (
        <div>
          {" "}
          EDIT MODE
          <input
            value="Cancel"
            type="button"
            className="btn btn-danger btn-sm mt-1 ml-2"
            onClick={this.handleCancelClick}
          />
        </div>
      );
    }
  }
}

export default User;
