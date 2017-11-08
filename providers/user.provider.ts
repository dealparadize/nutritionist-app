
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { ApiProvider } from "./api.provider";
// import { User } from "../interfaces/user.model";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {
  private HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  private _token: String;
//   private _user: User;
  private _business: String;

  constructor(
    public events: Events,
    public storage: Storage,
    public toastCtrl: ToastController,
    public api: ApiProvider
  ) {

  }

//   get user(): User {
//     return this._user;
//   }

//   set user(user: User) {
//     this._user = user;
//   }

  get token(): String {
    return this._token;
  }

  set token(token: String) {
    this._token = token;
  }

  get business(): String {
    return this._business;
  }

  set business(business: String) {
    this._business = business;
  }

  updateUser(): Observable<any> {
    return new Observable();
  }

//   setUser(data: any): Promise<any> {
//     let user: User = data.user;
//     user.token = data.token;
//     return this.storage.set('user', user);
//   };

  getUser(): Promise<any> {
    return this.storage.get('user');
  }

  login(username: string, password: string): Observable<any> {
    return this.api.post('/user/login', { email: username, password: password });
  };

  signup(data: any): Observable<any> {
    return this.api.post('/user/signup', data);
  };

  logout(): void {
    this.storage.remove('token');
    this.storage.remove('user');
    this.events.publish('user:logout');
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };

}
