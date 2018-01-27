import { Component } from '@angular/core';
import * as $ from 'jquery';

import { ProgramsService } from '../../services/programs/programs.service';
import { GoalsService } from '../../services/goals/goals.service';
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

	constructor(private programsService: ProgramsService, private goalsService: GoalsService, private analyticsService: AnalyticsService) {

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
			$.each(data['goals'], (index, value)=>{
				this.goalsService.getGoal(value.l1).subscribe((goal)=>{
					value.l1 = goal['name'].replace(/\d+./, '');
				})
				// if (value.l2) {
				// 	this.goalsService.getGoal(value.l2).subscribe((subGoal)=>{
				// 		value.l2 = subGoal['name'].replace(/\d+./, '');
				// 	})
				// }
			})
			this.activeProgram = data
		}, (err)=>{
			console.log("error", err)
		})
	}

	getAnalytics(id){
		this.analyticsService.planAnalytics('/analytics/program/'+id).subscribe((res)=>{
			this.analytics = res;
		}, (err)=>{
			console.log("err", err)
		})
	}

}
