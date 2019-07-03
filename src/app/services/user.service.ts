import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://reqres.in/';

  getAll() {
    return this.http.get(this.baseUrl + 'api/users');
  }
  add(user) {
    return this.http.post(this.baseUrl + 'api/users', user);
  }
  update(user) {
    return this.http.get(this.baseUrl + 'api/users');
  }
}
