import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsersDataService } from './usersdata.service';

import { ToastrService } from 'ngx-toastr';



@Injectable()
export class UsersService {

    constructor ( private usersDataService : UsersDataService, private toaster: ToastrService,
        private dialog: MatDialog) {

    }

    /**
     * @name getAllUsers
     * @param cb {Function}
     * @description
     * Get all the users
     */
    getAllUsers( cb) {

        this.usersDataService.getUserList().subscribe( resp => {
            cb(resp.data);
        }, error => {
            this.toaster.error('Error while getting Users list');
            cb([]);
        });
    }

    /**
     * @name addNewUser
     * @param userData {Object}
     * @param cb {Function}
     * @description
     * Add new user
     */
    addNewUser (userData, cb) {
        this.usersDataService.addNewUser(userData).subscribe( resp => {
            this.toaster.success('User added Successfully');
            cb(true);
        }, error => {
            this.toaster.error('Error while adding user');
            cb(false);
        })
    }

    /**
     * @name deleteUser
     * @param userId {String}
     * @description
     * Delete the selected User
     */
    deleteUser (userId, cb) {
        this.usersDataService.userDelete(userId).subscribe (resp => {
            this.toaster.success('User deleted Successfully');
            cb(true);
        }, error => {
            this.toaster.error('Error while deleting selected user');
            cb(false);
        })
    }

    /**
     * @name updateUser
     * @param userData {Object}
     * @param userId {String}
     * @param cb {Function}
     * @description
     * Update the selected User
     */
    updateUser (userData, userId, cb) {
        this.usersDataService.updateUser(userData, userId).subscribe(resp => {
            this.toaster.success('User details updated successfully');
            cb(true);
        }, error => {
            this.toaster.error(error.error.error);
            cb(false);
        })
    }


}