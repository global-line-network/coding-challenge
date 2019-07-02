import React, { Component } from 'react';

class UserAccountPage extends Component {
    constructor(parameters: any) {
        super(parameters);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className="container">
                <h1 className="">User Accounts</h1>
    
                <button type="button" className="btn btn-primary">+ Create New</button>
            </div>
        );
    }
}

export default UserAccountPage;