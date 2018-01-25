import { Component } from '@angular/core';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent{

	goals: any;
	programs: any;

	constructor(private goalsService: GoalsService, private programsService: ProgramsService) {
		this.getGoals();
		this.getPrograms();
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

}
