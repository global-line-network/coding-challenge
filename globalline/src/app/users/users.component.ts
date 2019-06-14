import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AddUserComponent} from './addUser.component';

import { UsersService } from './services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit{

    public userList = [];

    constructor ( private usersService: UsersService, private modalDialog: MatDialog) {

    }
    
    getAllUser() {
        this.usersService.getAllUsers( function (users) {
            this.userList = users;
            console.log("--resp:", this.userList);
        }.bind(this));
    }

    ngOnInit () {
        this.getAllUser();
    }

    openAddUserPopup () {

        const dialogRef = this.modalDialog.open(AddUserComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'success') {
                this.getAllUser();
            }
        });             

    }
}