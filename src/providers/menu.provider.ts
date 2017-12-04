import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { ApiProvider } from "./api.provider";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuProvider {

    constructor(
        public events: Events,
        public storage: Storage,
        public api: ApiProvider
    ) {}

    getUserMenu(data: any): Observable<any> {
        return this.api.get('/menu_user/data/' + data);
    }
}