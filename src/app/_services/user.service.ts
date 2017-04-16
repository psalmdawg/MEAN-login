import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService  {
  constructor(private http: Http, private config: AppConfig){ }

  create(user: User) {
        console.log(user)
        return this.http.post(this.config.apiUrl + '/user/register', user);
    }

    getAll() {
        return this.http.get(this.config.apiUrl + '/user').map(res => (res.json()));
      }

      delete(_id: string) {
      return this.http.delete(this.config.apiUrl + '/user/' + _id).map(res => (res.json()));
  }



    private jwt() {
          // create authorization header with jwt token
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log(currentUser)
          if (currentUser && currentUser.token) {
            // console.log('currentUser ' + currentUser + " : Usertoken " + currentUser.token )
              let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
              return new RequestOptions({ headers: headers });
          }
      }

}
