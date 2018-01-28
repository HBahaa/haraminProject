import { Component } from '@angular/core';
import * as $ from 'jquery';

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
			
			if (res['dateActualStart'] != 'NaN-NaN-NaN' && res['dateActualEnd'] != 'NaN-NaN-NaN') {
				res['prjPeriod'] = this.monthDiff(res['dateActualStart'] , res['dateActualEnd']);
			}
			else{
				res['prjPeriod'] = 'غير متاح'
			}
			if (res['dateActualStart'] == 'NaN-NaN-NaN') {
				res['dateActualStart'] = 'غير متاح'
			}
			if (res['dateActualEnd'] == 'NaN-NaN-NaN') {
				res['dateActualEnd'] = 'غير متاح'
			}
			if (res['datePlannedStart'] == 'NaN-NaN-NaN') {
				res['datePlannedStart'] = 'غير متاح'
			}
			if (res['datePlannedEnd'] == 'NaN-NaN-NaN') {
				res['datePlannedEnd'] = 'غير متاح'
			}
			
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

	monthDiff(d1, d2) {
		d1 = new Date(d1);
		d2 = new Date(d2);
	    var months;
	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth();
	    return months <= 0 ? 0 : months;
	}
}
