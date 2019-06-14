import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

import { UsersService } from './services/users.service';

//Add User Modal Dialog
@Component({
    selector: 'add-user-modal',
    templateUrl: 'addUser.component.html',
})
export class AddUserComponent {

    public firstName = new FormControl('', [Validators.required]);
    public lastName = new FormControl('', [Validators.required]);
    public email = new FormControl('', [Validators.required, Validators.email]);
    public job = new FormControl('', [Validators.required]);

    constructor (private usersService: UsersService,
        private dialogRef: MatDialogRef<AddUserComponent>) {
        
    }

    getEmailErrorMsg() {
        return this.email.hasError('required') ? 'You must enter the email id' :
        this.email.hasError('email') ? 'Not a valid email' : '';
    }


    addNewUser () {
        var userData = {
            name: this.firstName.value + ' ' + this.lastName.value,
            first_name: this.firstName.value,
            last_name: this.lastName.value,
            email: this.email.value,
            job: this.job.value
        }

        this.usersService.addNewUser(userData, function ( isSuccess ) {
            if (isSuccess) {
                this.dialogRef.close('success');
            }
            
        }.bind(this));

    }
}