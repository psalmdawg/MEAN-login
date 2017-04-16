import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private config: AppConfig) { }

    login(username: string, password: string) {
      return this.http.post(this.config.apiUrl + '/user/authenticate', { username: username, password: password })
      .map((response: Response) => {
        console.log("the response: " + response)
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
    }
}
