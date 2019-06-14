import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";

import { LandingComponent } from './landing.component';

import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/services/login.service';
import { LoginDataService } from '../login/services/loginData.service';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from '../register/services/register.service';
import { RegisterDataService } from '../register/services/registerData.service';

@NgModule({

    declarations: [
        LandingComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [ 
        LoginService,
        LoginDataService,
        RegisterService,
        RegisterDataService
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ]

})

export class LandingModule {}