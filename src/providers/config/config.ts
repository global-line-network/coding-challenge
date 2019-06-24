import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
  public Api: string;
  public URL: string;
  constructor(public http: HttpClient) {
    console.log('Hello ConfigProvider Provider');
    // this.Api = 'https://reqres.in/api/';
    this.Api = 'http://localhost:3000/api/';

  }

}
