import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  REGRES_URL= 'http://localhost:8000/';

  constructor(private http: HttpClient ) { }

  getUserList(){
    return this.http.get(this.REGRES_URL + 'api/users' );
  }

  createUser(firstName, lastName){
    return this.http.post(this.REGRES_URL + 'api/users', {
      first_name: firstName
      , last_name: lastName
    });
  }

  updateUser(id, firstName, lastName){
    return this.http.put(this.REGRES_URL + 'api/users', {
      id: id
      , first_name: firstName
      , last_name: lastName
    });
  }

  deleteUser(id){
    return this.http.delete(this.REGRES_URL + 'api/users/' + id);
  }
}
