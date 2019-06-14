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

    /**
     * @name getUserList
     * @description
     * Get the List of User
     */
    getUserList() : Observable<any> {
        var url = this.BASE_URL + '/api/users?delay=3';

        return this.http.get(url)
            .map((res: Response) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || JSON.parse(error._body)));
    }

    /**
     * @name addNewUser
     * @param userData {Object} 
     * @description 
     * Add New User 
     */
    addNewUser(userData) : Observable<any> {
        var url = this.BASE_URL + '/api/users';

        return this.http.post(url, userData)
            .map((res: Response) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || JSON.parse(error._body)));
    }

    /**
     * @name userDelete
     * @param userId {String}
     * @description
     * Delete the selected
     */
    userDelete (userId) : Observable<any> {
        var url = this.BASE_URL + '/api/users/'+ 2;

        return this.http.delete(url)
            .map((res: Response) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || JSON.parse(error._body)));

    }

    /**
     * @name updateUser
     * @param userData {Object}
     * @param userId {String}
     * @description
     * Update the selected user data
     */
    updateUser (userData, userId) : Observable<any> {
        var url = this.BASE_URL + '/api/users/'+ userId;

        return this.http.patch(url, userData)
            .map((res: Response) => {
                return res;
            })
            .catch((error: any) => Observable.throw(error || JSON.parse(error._body)));
    }

}