import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { ApiProvider } from "./api.provider";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class PantryProvider {

    constructor(
        public events: Events,
        public storage: Storage,
        public api: ApiProvider
    ) { }

    getUserPantryIngredsByDate(id: any, date: any): Observable<any>{
        return this.api.get('/pantry/'+id+'/date/'+date);
    }
    savePantry(idUser: any, data :any): Observable<any> {
        return this.api.post('/patientPantry/' + idUser, data);
    }
    getUserPantryByDate(idUser: any, date: any): Observable<any>{
        return this.api.get('/patientPantry/'+idUser+'/date/'+date);
    }
    deletePantryElementByDate(idUser:any, data: any): Observable<any>{
        return this.api.put('/patientPantry/'+idUser,data);
    }
    
    // getUserPantryByDate(idUser: any, date: any): Observable<any> {
    //     return this.api.get('/patientPantry/' + idUser + '/date/' + date);
    // }

    // deletePantryElementByDate(idUser:any, data: any): Observable<any>{
    //     return this.api.delete('/patientPantry/'+idUser,data);
    // }

}