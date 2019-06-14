import { Injectable } from '@angular/core';

import { LoginDataService } from './loginData.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class LoginService {

    constructor ( private loginDataService : LoginDataService, private toaster: MatSnackBar,
        private router: Router) {

    }

    loginUser(userData) {
        this.loginDataService.loginUser(userData).subscribe( resp => {

            console.log("Login Successfully!!");
            this.router.navigate(['/users']);
            
        }, error => {
            console.log("Error While Login User!!");
        });
    }

}