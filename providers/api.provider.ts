/**
 * Router configuration 
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
// import { UserProvider } from "./user.provider";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {

    private url: String = '';
    private headers = new Headers({
        'Content-Type': 'application/json',
    });
    private bussinesId: string;

    constructor(
        public http: Http
    ) {
        
    }

    setToken(token: String){
        this.headers.append('Authorization', 'Bearer ' + token);
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
        let route = `${this.url}${endpoint}`;
        return this.http.get(route, options);
    }

    post(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let route = `${this.url}${endpoint}`;
        return this.http.post(route, body, options);
    }

    put(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let route = `${this.url}${endpoint}`;
        return this.http.put(route, body, options);
    }

    delete(endpoint: string): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let route = `${this.url}${endpoint}`;
        return this.http.delete(route, options);
    }

    patch(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        let route = `${this.url}${endpoint}`;
        return this.http.put(route, body, options);
    }
}