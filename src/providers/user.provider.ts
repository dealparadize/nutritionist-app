/**
 * User provider to manage the user session 
 */

import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { ApiProvider } from "./api.provider";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class UserProvider {
    private HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    private _token: String;
    private _user: any;
    private _business: String;

    constructor(
        public events: Events,
        public storage: Storage,
        public api: ApiProvider
    ) {

    }

    get user(): any {
        return this._user;
    };

    set user(user: any) {
        this._user = user;
    };

    setUser(data: any): Promise<any> {
        return this.storage.set('user', data);
    };

    getUser(): Promise<any> {
        return this.storage.get('user');
    }

    login(email: string, pin: number): Observable<any> {
        return this.api.post('/patient/login/',
            {
                paciente: {
                    email: email,
                    pin: pin
                }
            });
    };

    signup(data: any): Observable<any> {
        return this.api.post('/patient/', data);
    };

    logout(): void {
        this.storage.remove('token');
        this.storage.remove('user');
        this.events.publish('user:logout');
    };

}
