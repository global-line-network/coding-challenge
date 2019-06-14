import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AddUserComponent} from './addUser.component';
import { ConfirmationDialogComponent } from '../shared/confirmationDialog/confirmationDialog.component';

import { UsersService } from './services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit{

    public userList = [];
    public searchText: '';

    public selectedUser = {
        name: '',
        email: ''
    }

    public showLoader = false;

    constructor ( private usersService: UsersService, private modalDialog: MatDialog) {

    }
    
    /**
     * @name getAllUser
     * @description
     * Get list of users
     */
    getAllUser() {
        this.showLoader = true;
        this.usersService.getAllUsers( function (users) {
            this.userList = users;
            this.showLoader = false;
        }.bind(this));
    }

    ngOnInit () {
        this.getAllUser();
    }

    /**
     * @name openAddUserPopup
     * @description
     * Open the Add the User Popup to create User
     */
    openAddUserPopup () {

        const dialogRef = this.modalDialog.open(AddUserComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'success') {
                this.getAllUser();
            }
        });             

    }

    /**
     * @name confirmationToDelete
     * @param user {Object}
     * @description
     * Confirmation to delete the selected User
     */
    confirmationToDelete (user) {

        const confDialogRef = this.modalDialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'Are you sure to delete the user?'
            }
        });

        confDialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.usersService.deleteUser(user.id, function (isSuccess) {
                    if (isSuccess) {
                        this.getAllUser();
                    }
                }.bind(this));
            }
        });        

    }

    /**
     * @name setSelectedUserEdit
     * @param user {Object}
     * @description
     * Set the selected User to Edit
     */
    setSelectedUserEdit (user) {

        user.editData = {
            name: user.first_name + ' ' + user.last_name,
            email: user.email
        }
    }

    /**
     * @name updateUserData
     * @param user {Object}
     * @description
     * Update the user data
     */
    updateUserData (user) {
        var userData = {
            name: user.editData.name,
            email: user.editData.email,
        };

        this.usersService.updateUser(userData, user.id, function (isSuccess) {
            if (isSuccess) {
                this.getAllUser();
            }
        }.bind(this));
    }
}