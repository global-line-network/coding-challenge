import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  REGRES_URL= 'https://reqres.in/';

  constructor(private http: HttpClient ) { }

  getUserList(){
    console.log(this.REGRES_URL+'api/users?page=1');
    return this.http.get(this.REGRES_URL + 'api/users?page=1' );
  }
}
