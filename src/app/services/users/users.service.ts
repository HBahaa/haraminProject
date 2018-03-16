import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class UsersService {

	constructor(private api: ApiService) { }

	users(){
		return this.api.post('user/list');
	}

	getUser(id){
		return this.api.get('user/'+id);
	}

}
