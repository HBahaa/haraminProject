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
				localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzQyMjk0MjIsImRhdGEiOiJ7XCJfaWRcIjpcImFkbWluXCIsXCJuYW1lXCI6XCJhZG1pblwiLFwidGl0bGVcIjpcImFkbWluXCIsXCJwb3NpdGlvblwiOlwiYWRtaW5cIixcIm1vYmlsZVwiOlwiXCIsXCJ3aGF0c2FwcFwiOlwiXCIsXCJ0ZWxlcGhvbmVcIjpcIlwiLFwiZW1haWwxXCI6XCJcIixcImVtYWlsMlwiOlwiXCIsXCJyb2xlXCI6XCJhZG1pblwiLFwiZW50aXR5bDFcIjpcIlwiLFwiZW50aXR5bDJcIjpcIlwiLFwiZW50aXR5bDNcIjpcIlwiLFwiZW50aXR5bDRcIjpcIlwiLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJwYXNzd29yZFwiOlwiOTk4NDVcIixcImFjY2Vzc1wiOntcImludHJvXCI6dHJ1ZSxcImdvYWxcIjp0cnVlLFwicHJvZ3JhbVwiOnRydWUsXCJwcm9qZWN0XCI6dHJ1ZSxcInRhc2tcIjp0cnVlLFwiZW50aXR5XCI6dHJ1ZSxcInVzZXJcIjp0cnVlLFwicmVwb3J0XCI6dHJ1ZSxcInRvdGFsXCI6dHJ1ZX0sXCJhdXRoVGFza1wiOjAsXCJhdXRoUHJvamVjdFwiOjAsXCJhdXRoUHJvZ3JhbVwiOjAsXCJhdXRoR29hbHNcIjowLFwiYXV0aFVzZXJzXCI6MCxcImF1dGhFbnRpdGllc1wiOjB9IiwiaWF0IjoxNTM0MTQzMDIyfQ.GrPA9EhDBbOvEhOhqntRKttogM4_ZMXQT5NRh8uYCgA');
				// if (localStorage.getItem('token')) {
					resolve(response)
				// }
				
			}).fail(error=>{
				reject(error)
			});
		})
	}

}
