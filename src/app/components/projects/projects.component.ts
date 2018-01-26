import { Component } from '@angular/core';

import { ProjectsService } from '../../services/projects/projects.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent{
	id: any;
	projects: any;
	activeProject :any = {};
	analytics: any;

	constructor(private projectsService: ProjectsService, private analyticsService: AnalyticsService) {
		
		this.getData('1514490491256')
		this.getProjects();
	}

	getProjects(){
		this.projectsService.projects().subscribe((resp)=>{
			this.projects = resp;
		}, (err)=>{
			console.log(err);
		})
	}

	getData(id){
		this.getAnalytics(id);
		this.projectsService.getProject(id).subscribe((res)=>{
			this.activeProject = res;
		}, (err)=>{
			console.log("error", err)
		})
	}
	getAnalytics(id){
		this.analyticsService.planAnalytics('/analytics/project/'+id).subscribe((res)=>{
			this.analytics = res;
		}, (err)=>{
			console.log("err", err)
		})
	}
}
