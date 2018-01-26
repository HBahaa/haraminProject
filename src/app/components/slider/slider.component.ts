import { Component } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
	programs: any;
	goals: any;
	vision: any;
	message: any;

	constructor(private programsService: ProgramsService,
				private goalsService: GoalsService,
				private globalService: GlobalService) {

		this.getContant();
	}

	getContant(){
		this.programsService.programs().subscribe((res)=>{
			this.programs = res;
			console.log("this.programs.length",this.programs.length)
		})
		this.goalsService.goals().subscribe((res)=>{
			this.goals = res;
			console.log("this.goals.length",this.goals.length)
		})
		this.globalService.global().subscribe((resp=>{
			this.message = resp[0].data.message;
			this.vision = resp[0].data.vision;
		}))
	}
}
