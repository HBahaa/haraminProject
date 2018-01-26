import { Component } from '@angular/core';

import { ProgramsService } from '../../services/programs/programs.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
	id: any;
	programs: any;
	activeProgram :any = {};
	analytics:any;

	constructor(private programsService: ProgramsService, private analyticsService: AnalyticsService) {

		this.getData('1514489024091')
		this.getPrograms();
	}

	getPrograms(){
		this.programsService.programs().subscribe((resp)=>{
			this.programs = resp;
		}, (err)=>{
			console.log(err);
		})
	}
	getData(id){
		this.getAnalytics(id);
		this.programsService.getProgram(id).subscribe((data)=>{
			this.activeProgram = data
		}, (err)=>{
			console.log("error", err)
		})
	}

	getAnalytics(id){
		this.analyticsService.planAnalytics('/analytics/program/'+id).subscribe((res)=>{
			console.log("res", res)
			this.analytics = res;
		}, (err)=>{
			console.log("err", err)
		})
	}

}
