/**
 * Router configuration 
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { LoadingController, Loading, Events } from "ionic-angular";

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiProvider {

    private url: String = 'http://37.139.15.87:8080/api/v1';
    private headers = new Headers({
        'Content-Type': 'application/json',
    });
    private message: string = '';
    private loadingFlag: boolean;
    private loading = this.loadingCtrl.create({
        content: this.message
    });

    constructor(
        public http: Http,
        public loadingCtrl: LoadingController,
    ) {

    }

    setTokenHeader(token: string) {
        this.headers.set('x-access-token', token);
        console.log("TOKEN:", token);
    }

    get(endpoint: string, params?: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        // Support easy query params for GET requests
        if (params) {
            let p = new URLSearchParams();
            for (let k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }

        let loading = this.getLoading();
        loading.present();

        return this.http.get(`${this.url}${endpoint}`, options)
            .finally(() => {
                loading.dismiss();
            });
    }

    post(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        let loading = this.getLoading();
        loading.present();

        return this.http.post(`${this.url}${endpoint}`, body, options)
        .finally(() => {
            loading.dismiss();
        });
    }

    put(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        let loading = this.getLoading();
        loading.present();

        return this.http.put(`${this.url}${endpoint}`, body, options)
            .finally(() => {
                loading.dismiss();
            });
    }

    // delete(endpoint: string,body: any): Observable<any> {
    //     let options = new RequestOptions({ headers: this.headers });

    //     let loading = this.getLoading();
    //     loading.present();

    //     // return this.http.delete(`${this.url}${endpoint}`, body, options)
    //     //     .finally(() => {
    //     //         loading.dismiss();
    //     //     });
    // }

    patch(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });

        let loading = this.getLoading();
        loading.present();

        return this.http.put(`${this.url}${endpoint}`, body, options)
            .finally(() => {
                loading.dismiss();
            });
    }

    getLoading(): Loading {
        return this.loadingCtrl.create({
            content: this.message
        });
    }
}