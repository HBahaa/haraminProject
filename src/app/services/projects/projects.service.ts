import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ApiService } from '../api/api.service';

@Injectable()
export class ProjectsService {

	constructor(private api: ApiService, private http: HttpClient) { }

	projects(){
		return this.api.post('project/list');
	}

	projectsInProgram(){

		return this.http.post('project/list',{program: "1514488967962"});
	}


	getProject(id){
		return this.api.get('project/'+id);
	}
}
