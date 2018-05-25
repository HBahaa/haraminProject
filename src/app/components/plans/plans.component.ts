import { Component } from '@angular/core';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent{

	goals: any;
	programs: any;
	analytics: any;
	Math: any;
	token: any;

	constructor(private goalsService: GoalsService, private programsService: ProgramsService, private analyticsService: AnalyticsService) {
		this.Math = Math;
		this.token = localStorage.getItem("token");
		if (this.token) {
			this.getGoals();
			this.getPrograms();
			this.getAnalytics();
		}
		
	}
 
	getGoals(){
		this.goalsService.goals(this.token).then((resp)=>{
			$.each(resp, (index, value)=>{
				value['name'] = value['name'].replace(/\d+./, '');
			});
			this.goals = resp;

		}).catch(err=>{
			console.log("err", err)
		})
	}
	getPrograms(){
		this.programsService.programs(this.token).then((res)=>{
			this.programs = res;
		}).catch(err=>{
			console.log("err", err)
		});
	}


	getAnalytics(){
		this.analyticsService.planAnalytics('analytics', this.token).then((res)=>{
			this.analytics = res;
		}).catch(err=>{
			console.log("err", err)
		});
	}

}
