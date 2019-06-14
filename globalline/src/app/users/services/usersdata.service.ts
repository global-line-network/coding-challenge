import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

// Import RxJs required methods
import 'rxjs/Rx';

@Injectable()
export class UsersDataService {

    private BASE_URL = environment.API_URL;

    constructor ( private http: HttpClient) {

    }

    getUserList() : Observable<any> {
        var url = this.BASE_URL + '/api/users?page=2';

        return this.http.get(url)
            .map((res: Response) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || JSON.parse(error._body)));
    }

    addNewUser(userData) : Observable<any> {
        var url = this.BASE_URL + '/api/users';

        return this.http.post(url, userData)
            .map((res: Response) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || JSON.parse(error._body)));
    }

}