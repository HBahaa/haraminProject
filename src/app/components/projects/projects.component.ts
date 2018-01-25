import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	id: any;
	projects: any;
	activeProject :any = {};

	constructor(private route: ActivatedRoute, private projectsService: ProjectsService) {
		if (this.route.snapshot.paramMap.get('id')) {
			this.id = this.route.snapshot.paramMap.get('id');
		}else{
			this.id = 1514490491256;
		}
		this.getProjects();
	}

	ngOnInit() {
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
	}

}
