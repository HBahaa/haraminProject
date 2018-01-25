import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';


@Injectable()
export class GlobalService {

	constructor(private api: ApiService) { }

	global(){
		return this.api.post('global/list');
	}

}
