import React, { Component } from 'react';
import { UserAccount } from '../../api/types';
import UserApi from '../../api/userApi';

interface IUserAccountPageState {
    users: UserAccount[]
}

class UserAccountPage extends Component<any, IUserAccountPageState> {
    constructor(parameters: any) {
        super(parameters);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        UserApi.getUsers()
            .then(userList => {

                if (userList && userList.length > 0) {
                    this.setState({
                        users: userList
                    });
                }
            });
    }

    render() {
        return (
            <div className="container">
                <h1 className="">User Accounts</h1>
    
                <button type="button" className="btn btn-primary">+ Create New</button>

                <code>{JSON.stringify(this.state.users)}</code>
            </div>
        );
    }
}

export default UserAccountPage;