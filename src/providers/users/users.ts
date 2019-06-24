import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class UsersProvider {
  public apiUrl: string;
  constructor(
    public http: HttpClient,
    public configs: ConfigProvider
  ) {
    this.apiUrl = configs.Api;
  }
  handlelistusers(Query) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + 'users?page=' + Query)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  handlecreateuser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'users', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  handleupdateuser(UserId, data) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.apiUrl + 'users/' + UserId, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  handledeleteuser(data) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiUrl + 'users/' + data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
