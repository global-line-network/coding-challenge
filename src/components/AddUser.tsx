import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createUser } from "../actions/userAccount";
import { Button, Modal } from 'react-bootstrap';
import { AppDispatch } from '../store';

export default function AddUserButton () {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [avatar, setAvatar] = useState("");

    const initialUserAccountState = {
        id: null,
        first_name: "",
        last_name: "",
        avatar: "",
        email: ""
      };
      const [userAccount, setUserAccount] = useState(initialUserAccountState);
      const [submitted, setSubmitted] = useState(false);
    
      const dispatch = useDispatch<AppDispatch>();
    
      const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setUserAccount({ ...userAccount, [name]: value });
      };
    
      const saveUserAccount = () => {
        const { first_name, last_name, avatar, email } = userAccount;
    
        dispatch(createUser(first_name, last_name, avatar, email))
          .then((data:any) => {
            setUserAccount({
              id: data.id,
              first_name: data.first_name,
              last_name: data.last_name,
              avatar: data.avatar,
              email: data.email
            });
            setSubmitted(true);
    
            console.log(data);
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            handleClose();
          });
      };
    
      const newUserAccount = () => {
        setUserAccount(initialUserAccountState);
        setSubmitted(false);
      };
    
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            + Create New
        </Button>
    
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>Create User Account</Modal.Header>
            <Modal.Body>
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className="btn btn-success" onClick={newUserAccount}>
                                Add
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userAccount.first_name}
                                    onChange={handleInputChange}
                                    name="first_name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userAccount.last_name}
                                    onChange={handleInputChange}
                                    name="last_name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="avatar">Avatar</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userAccount.avatar}
                                    onChange={handleInputChange}
                                    name="avatar"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={userAccount.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    required
                                />
                            </div>
                            <div onClick={saveUserAccount} className="text-center">
                                <button className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {/* <form name="form">
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        value={firstName}
                        placeholder="Mohsen"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        value={lastName}
                        placeholder="Barati"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Avatar Url</label>
                    <input
                        type="text"
                        name="avatar"
                        className="form-control"
                        value={avatar}
                        placeholder="https://example.com/mypic.jpg"
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary">
                        Save
                    </button>
                </div>
            </form> */}
            </Modal.Body>
        </Modal>
        </>
    );
}