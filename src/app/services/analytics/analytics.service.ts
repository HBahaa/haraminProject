import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class AnalyticsService {

	constructor(private api: ApiService) { }

	planAnalytics(endPoint){
		return this.api.get(endPoint);
	}

}
 