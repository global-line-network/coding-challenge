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
        this.onCreateClicked = this.onCreateClicked.bind(this);
    }

    async onCreateClicked() {

        const newUser = await UserApi.createUser({
            id: -1,
            name: "",
            birthDate: "2019/7/3",
            avatarUrl: ""
        });

        this.setState({
            users: [
                newUser,
                ...this.state.users
            ]
        });
    }

    onEditConfirm(editedUser: UserAccount) {

        const existingUser = this.state.users.find(user => user.id === editedUser.id)!;

        const idx = this.state.users.indexOf(existingUser);

        this.setState({
            users: [
                ...this.state.users.slice(0, idx),
                editedUser,
                ...this.state.users.slice(idx + 1, this.state.users.length)
            ]
        });
    }

    onDelete(userId : number) {
        this.setState({
            users: [
                ...this.state.users.filter(user => user.id !== userId)
            ]
        });
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
    
                <button type="button" className="btn btn-primary" onClick={this.onCreateClicked}>+ Create New</button>

                {this.state.users && this.state.users.map(user => <UserAccountListItem key={user.id} user={user} onEdit={this.onEditConfirm} onDelete={this.onDelete} />)}
            </div>
        );
    }
}

export default UserAccountPage;