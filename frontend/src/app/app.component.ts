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
  constructor (private conn: ConnectionService) {}

  ngOnInit(){
    this.conn.getUserList().subscribe((list) => {
      this.result = list;
      this.userList = this.result.data;
      console.log("AFTER PRINT");
    })
  }
}
