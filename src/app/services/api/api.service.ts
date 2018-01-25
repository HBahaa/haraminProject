import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiService {

	url: string = 'http://35.190.171.93:8001/api/';

	constructor(public http: HttpClient) {}

	get(endpoint: string, params?: any, reqOpts?: any) {
		if (!reqOpts) {
			reqOpts = {
		    	params: new HttpParams()
			};
		}

		// Support easy query params for GET requests
		if (params) {
			reqOpts.params = new HttpParams();
			for (let k in params) {
		    	reqOpts.params.set(k, params[k]);
			}
		}

		return this.http.get(this.url + '/' + endpoint, reqOpts);
	}

	post(endpoint: string, reqOpts?: any) {
		return this.http.post(this.url + '/' + endpoint, reqOpts);
	}
}
