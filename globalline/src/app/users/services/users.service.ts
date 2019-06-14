import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsersDataService } from './usersdata.service';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class UsersService {

    constructor ( private usersDataService : UsersDataService, private toaster: MatSnackBar,
        private dialog: MatDialog) {

    }

    getAllUsers( cb) {

        this.usersDataService.getUserList().subscribe( resp => {
            console.log("in getAll Users");
            cb(resp.data);
            
        }, error => {
            console.log("Error while getting users");
            cb([]);
        });
    }

    addNewUser (userData, cb) {
        this.usersDataService.addNewUser(userData).subscribe( resp => {
            console.log("user added successfully");
            cb(true);
        }, error => {
            console.log("-- error while adding User");
            cb(false);
        })
    }


}