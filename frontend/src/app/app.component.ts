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
      this.userList = this.result.data;
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
      this.userList.push({ "id": list["id"],"first_name": list["first_name"],  "last_name": list["last_name"]});
      console.log("AFTER CREATE");
      console.log(this.userList);
    })
  }

  updateUser(){
    this.conn.updateUser(this.id, this.firstName, this.lastName).subscribe((list) => {
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id == this.id) {
          this.userList[i].first_name = this.firstName;
          this.userList[i].last_name = this.lastName;
          break;
        }
      }
    });
  }

  deleteUser(){
    console.log("delete " + this.id + "?");
    // console.log(this.userList.splice(0,1));
    this.conn.deleteUser(this.id).subscribe((list) => {
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id == this.id) {
          this.userList.splice(i,1);
          break;
        }
      }
      console.log(this.userList);
    });
  }
}
