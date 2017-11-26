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
    private _devicekey: String;
    private _business: String;

    constructor(
        public events: Events,
        public storage: Storage,
        public api: ApiProvider
    ) {

    }
    get deviceKey():any{
        return this._devicekey;
    }
    get user(): any {
        return this._user;
    }
    set deviceKey(deviceKey: any){
        this._devicekey = deviceKey;
    }
    set user(user: any) {
        this._user = user;
    };
    setDeviceKey(data: any): Promise<any> {
        return this.storage.set('deviceKey', data);
    };

    getDeviceKey(): Promise<any> {
        return this.storage.get('deviceKey');
    }
    setUser(data: any): Promise<any> {
        return this.storage.set('user', data);
    };

    getUser(): Promise<any> {
        return this.storage.get('user');
    }

    login(email: string, pin: number,deviceKey : string): Observable<any> {
        return this.api.post('/patient/login/',
            {
                paciente: {
                    email: email,
                    pin: pin,
                    deviceKey: deviceKey
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
    //endpoint para crear una cita
    createAppointment(data: any): Observable<any>{
        return this.api.post('/appointment/',data);
    };
    //endpoint para recuperar las citas de un día
    getAppointmentsForDate(data:any):Observable<any>{
        return this.api.get('/appointmentForDate/'+data)
    };
}
