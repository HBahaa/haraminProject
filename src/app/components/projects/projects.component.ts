import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent{
	id: any;
	projects: any;
	activeProject :any = {};

	constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
		
		if (this.route.snapshot.paramMap.get('id')) {
			this.getData(this.route.snapshot.paramMap.get('id'))
		}
		else{
			this.getData('1514490491256')
		}
		this.getProjects();
	}

	getProjects(){
		this.projectsService.projects().subscribe((resp)=>{
			console.log(resp);
			this.projects = resp;
		}, (err)=>{
			console.log(err);
		})
	}

	getData(id){
		console.log(id)
		this.id = this.route.snapshot.paramMap.get('id');
		this.projectsService.getProject(id).subscribe((res)=>{
			this.activeProject = res;
		}, (err)=>{
			console.log("error", err)
		})
	}

}
