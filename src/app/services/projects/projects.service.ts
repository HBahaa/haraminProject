import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';

@Injectable()
export class ProjectsService {

	constructor(private api: ApiService) { }

	projects(){
		return this.api.post('project/list');
	}
}
