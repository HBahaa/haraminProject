import { Component } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { GoalsService } from '../../services/goals/goals.service';
import { ProgramsService } from '../../services/programs/programs.service';
import * as $ from 'jquery';

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
		});
		this.goalsService.goals().subscribe((res)=>{
			$.each(res, (index, value)=>{
				value['name'] = value['name'].replace(/\d+./, '');
			});
			this.goals = res;
		});
		this.globalService.global().subscribe((resp=>{
			this.message = resp[0].data.message;
			this.vision = resp[0].data.vision;
		}))
	}
}
