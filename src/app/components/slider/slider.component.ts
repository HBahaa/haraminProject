import { Component } from '@angular/core';
import { GlobalService } from '../../services/global/global.service';
import { GoalsService } from '../../services/goals/goals.service';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
	projects: any;
	goals: any;
	vision: any;
	message: any;

	constructor(private projectsService: ProjectsService,
				private goalsService: GoalsService,
				private globalService: GlobalService) {

		this.getContant();
	}

	getContant(){
		this.projectsService.projects().subscribe((res)=>{
			this.projects = res;
			console.log("this.projects.length",this.projects.length)
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
