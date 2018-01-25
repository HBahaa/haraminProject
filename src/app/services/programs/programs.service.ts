import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class ProgramsService {

	constructor(private api: ApiService) { }
	
	programs(){
		return this.api.post('program/list');
	}
}
