import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://reqres.in/';

  getAll() {
    return this.http.get(this.baseUrl + 'api/users');
  }
}
