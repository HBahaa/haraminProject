import { Component } from '@angular/core';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent{

	goals: any;
	programs: any;
	analytics: any;

	constructor(private goalsService: GoalsService, private programsService: ProgramsService, private analyticsService: AnalyticsService) {
		this.getGoals();
		this.getPrograms();
		this.getAnalytics();
	}

	getGoals(){
		this.goalsService.goals().subscribe((resp)=>{
			this.goals = resp;
		}, (err)=>{
			console.log("err", err)
		})
	}
	getPrograms(){
		this.programsService.programs().subscribe((res)=>{
			this.programs = res;
		}, (err)=>{
			console.log("err", err)
		})
	}


	getAnalytics(){
		this.analyticsService.planAnalytics('analytics').subscribe((res)=>{
			this.analytics = res;
		}, (err)=>{
			console.log("err", err)
		})
	}

}
