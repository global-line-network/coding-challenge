import React, { Component } from 'react';
import { UserAccount } from '../../api/types';
import { type } from 'os';

export interface IUserAccountListItemProps {
    user: UserAccount,
    onEdit: (user: UserAccount) => void,
    onDelete: (userId: number) => void
}

interface IUserAccountListItemState {
    isEditing: boolean,
    nameInput: string,
    dateInput: string
}

class UserAccountListItem extends Component<IUserAccountListItemProps, IUserAccountListItemState> {

    constructor(props: IUserAccountListItemProps) {
        super(props);

        this.state = {
            isEditing: props.user.name.trim().length === 0,
            nameInput: props.user.name,
            dateInput: props.user.birthDate
        };

        this.onEditToggle = this.onEditToggle.bind(this);
        this.onTextInputChange = this.onTextInputChange.bind(this);
        this.onEditConfirmed = this.onEditConfirmed.bind(this);
    }

    onEditToggle() {

        const isCancelling = this.state.isEditing === false;

        this.setState({
            nameInput: isCancelling ? this.props.user.name : this.state.nameInput,
            dateInput: isCancelling ? this.props.user.birthDate : this.state.dateInput,
            isEditing: !this.state.isEditing
        });
    }

    onEditConfirmed() {
        this.onEditToggle();

        const editedUser = {
            ...this.props.user,
            name: this.state.nameInput,
            birthDate: this.state.dateInput
        };

        return this.props.onEdit(editedUser);
    }

    onTextInputChange(event: React.ChangeEvent<HTMLInputElement>) {

        const fieldName = event.currentTarget.name;
        const value = event.currentTarget.value;

        this.setState({
            ...this.state,
            [fieldName]: value
        });
    }

    render() {
        return (
            <div style={{ borderRadius: 10 }} className="col border m-2 p-3">
                <div className="row">
                    <div className="col-1">
                        <img style={{borderRadius: 50, width: 50, height: 50}} 
                            src={this.props.user.avatarUrl} />
                    </div>

                    {!this.state.isEditing && <div className="col-4">
                        <div className="row"><h4>{this.props.user.name}</h4></div>
                        <div className="row"><h5>{this.props.user.birthDate}</h5></div>
                    </div>}

                    {this.state.isEditing && <div className="col-4">
                        <div className="row">
                            <input name="nameInput" className="form-control" type="text" onChange={this.onTextInputChange} 
                                placeholder="Enter user name"
                                defaultValue={this.state.nameInput}></input>
                        </div>
                        <div className="row">
                            <input name="dateInput" className="form-control" type="text" onChange={this.onTextInputChange} 
                                placeholder="Enter date"
                                defaultValue={this.state.dateInput}></input>
                        </div>
                    </div>}

                    <div className="col-1">

                        {this.state.isEditing && <div className="row m-2"><i className="fas fa-check-circle" 
                            onClick={this.onEditConfirmed}></i></div>}

                        {this.state.isEditing && <div className="row m-2"><i className="fas fa-times-circle" 
                            onClick={this.onEditToggle}></i></div>}

                        {!this.state.isEditing && <div className="row m-2"><i className="far fa-edit" onClick={this.onEditToggle}></i></div>}
                        
                        {!this.state.isEditing && <div className="row m-2"><i className="far fa-trash-alt" 
                            onClick={() => this.props.onDelete(this.props.user.id)}></i></div>}
                    </div>
                    <div>{this.props.user.id}</div>
                </div>
            </div>
        );
    }
};

export default UserAccountListItem;