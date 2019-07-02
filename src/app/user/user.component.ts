import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userList: User[];
  isDataLoading: boolean = true;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe((userList:any) => {
      this.userList = userList.data;
      this.isDataLoading = false;
    });
  }
}
