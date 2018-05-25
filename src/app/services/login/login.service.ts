import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { ApiService } from '../api/api.service';

@Injectable()
export class LoginService {

	url: string;

	constructor(private api: ApiService) {
		this.url = this.api.url;
	}

	login(username, password){
		return new Promise((resolve, reject)=>{
			
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${this.url}/login?username=${username}&password=${password}`,
				"method": "POST",
				"headers": {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache",
				"Postman-Token": "55c500a7-0017-18fd-1a1f-5c43efdc04da"
				}
			}

			$.ajax(settings).done(response=> {
				localStorage.setItem('token', response.token);
				// if (localStorage.getItem('token')) {
					resolve(response)
				// }
				
			}).fail(error=>{
				reject(error)
			});
		})
	}

}
