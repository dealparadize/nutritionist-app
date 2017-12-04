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
export class NotificationMessageProvider {
    private HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
    private _token: String;
    private _user: any;
    private _devicekey: String;
    private _business: String;

    constructor(
        public events: Events,
        public storage: Storage,
        public api: ApiProvider
    ) {

    }

    getMessages(data: any): Observable<any> {
        return this.api.get('/messageByUser/' + data);
    }

    getGeneralMessages() {
        return this.api.get('/generalMessage/');
    }

}