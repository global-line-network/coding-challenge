import { Injectable } from '@angular/core';

import { RegisterDataService } from './registerData.service';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class RegisterService {

    constructor ( private registerDataService : RegisterDataService, private toaster: MatSnackBar) {

    }

    registerNewUser(userData) {
        this.registerDataService.registerUser(userData).subscribe( resp => {

            console.log("New User Registerd Successfully!!");
            
        }, error => {
            console.log("Error While Creating New User!!");
        });
    }

}