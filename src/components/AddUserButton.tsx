import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function AddUserButton () {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastname] = useState("");
    const [avatar, setAvatar] = useState("");
    
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
                <form name="form">
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
            </form>
            </Modal.Body>
        </Modal>
        </>
    );
}