import React, { Component } from 'react';
import { UserAccount } from '../../api/types';
import UserApi from '../../api/userApi';
import UserAccountListItem from './UserAccountListItem';

interface IUserAccountPageState {
    users: UserAccount[]
}

class UserAccountPage extends Component<any, IUserAccountPageState> {
    constructor(parameters: any) {
        super(parameters);

        this.state = {
            users: []
        };

        this.onEditConfirm = this.onEditConfirm.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onEditConfirm(editedUser: UserAccount) {
        console.log("edit confirm!");

        this.setState({
            users: [
                ...this.state.users.slice(0, editedUser.id - 1), 
                editedUser,
                ...this.state.users.slice(editedUser.id, this.state.users.length)
            ]
        });
    }

    onDelete(userId : number) {
        console.log(`delete user ${userId} clicked!`);
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

                {this.state.users && this.state.users.map(user => <UserAccountListItem key={user.id} user={user} onEdit={this.onEditConfirm} onDelete={this.onDelete} />)}
            </div>
        );
    }
}

export default UserAccountPage;