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
    private _user: any;
    private _devicekey: String;

    constructor(
        public events: Events,
        public storage: Storage,
        public api: ApiProvider
    ) {

    }

    get deviceKey(): any {
        return this._devicekey;
    }

    get user(): any {
        return this._user;
    }

    set deviceKey(deviceKey: any) {
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

    setImage(data: any): Promise<any> {
        return this.storage.set('image', data);
    };

    getImage(): Promise<any> {
        return this.storage.get('image');
    }

    deleteStorage() {
        this.storage.clear();
    }

    login(email: string, pin: number, deviceKey: string): Observable<any> {
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
        this.events.publish('user:logout');
    };

    /**
     * appointment
     */

    updateAppointment(id: any, data: any): Observable<any> {
        return this.api.put('/appointment/' + id, data);
    };

    getAppointmentRegisterData(data: any): Observable<any> {
        return this.api.get('/appointmentRegister/appointment/' + data);
    }

    getFirstLastAppointmentRegisterData(data: any): Observable<any> {
        return this.api.get('/apointmentRegister/firstLast/user/' + data);
    }
    getFormuleData(data: any): Observable<any>{
        return this.api.get('/getFatMass/'+data);
    }

    createAppointment(data: any): Observable<any> {
        return this.api.post('/appointment/', data);
    };

    getAppointmentsForDate(data: any): Observable<any> {
        return this.api.get('/appointmentForDate/' + data);
    };

    getAppointmentById(id: any): Observable<any> {
        return this.api.get('/appointment/' + id);
    };
}
