/**
 * Router configuration 
 */

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiProvider {

    private url: String = 'http://37.139.15.87:8080/api/v1';
    private headers = new Headers({
        'Content-Type': 'application/json',
    });

    constructor(
        public http: Http
    ) {

    }

    setTokenHeader(token: string) {
        this.headers.set('x-access-token', token);
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
        return this.http.get(`${this.url}${endpoint}`, options);
    }

    post(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post(`${this.url}${endpoint}`, body, options);
    }

    put(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.put(`${this.url}${endpoint}`, body, options);
    }

    delete(endpoint: string): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.delete(`${this.url}${endpoint}`, options);
    }

    patch(endpoint: string, body: any): Observable<any> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.put(`${this.url}${endpoint}`, body, options);
    }
}