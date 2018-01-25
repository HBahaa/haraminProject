import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';


@Injectable()
export class GoalsService {

	constructor(private api: ApiService) { }
	goals(){
		return this.api.post('goal/list');
	}

}
