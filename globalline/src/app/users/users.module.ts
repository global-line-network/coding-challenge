import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UsersComponent } from './users.component';
import { AddUserComponent } from './addUser.component';
import { UsersService } from './services/users.service';
import { UsersDataService } from './services/usersdata.service';

@NgModule({
    declarations: [
        UsersComponent,
        AddUserComponent
    ],
    entryComponents: [
        AddUserComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        UsersService,
        UsersDataService
    ],
})
export class UsersModule {}