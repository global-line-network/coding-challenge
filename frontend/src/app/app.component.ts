import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  result;
  userList = [];
  firstName; 
  lastName;
  id;
  show = 0; //0 -> Create, 1 -> Update, 2 -> Delete
  constructor (private conn: ConnectionService) {}

  ngOnInit(){
    this.conn.getUserList().subscribe((list) => {
      this.result = list;
      this.userList = this.result;
      console.log(this.result);
    });
  }

  setFirstName( strFirstName ){
    this.firstName = strFirstName.value;
  }

  
  setLastName( strLastName ){
    this.lastName = strLastName.value;
  }

  setId( strId ){
    this.id = strId.value;
  }

  showCreate(){
    this.show = 0;
  }

  showUpdate(){
    this.show = 1;
  }
  showDelete(){
    this.show = 2;
  }

  addUser(){
    this.conn.createUser(this.firstName, this.lastName).subscribe((list) => {
      this.result = list;
      this.userList = this.result;
      console.log(this.result);
    })
  }

  updateUser(){
    this.conn.updateUser(this.id, this.firstName, this.lastName).subscribe((list) => {
      this.result = list;
      this.userList = this.result;
      console.log(this.result);
    });
  }

  deleteUser(){
    console.log("delete " + this.id + "?");
    // console.log(this.userList.splice(0,1));
    this.conn.deleteUser(this.id).subscribe((list) => {
      this.result = list;
      this.userList = this.result;
      console.log(this.result);
    });
  }
}
