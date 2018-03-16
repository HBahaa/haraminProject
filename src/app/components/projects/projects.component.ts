import { Component } from '@angular/core';

import { ProjectsService } from '../../services/projects/projects.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { UsersService } from '../../services/users/users.service';

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

	constructor(private projectsService: ProjectsService, private analyticsService: AnalyticsService,
				private usersService: UsersService) {
		
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
		this.projectsService.getProject(id).subscribe((res)=>{
			
			if (res['dateActualStart'] != 'NaN-NaN-NaN' && res['dateActualEnd'] != 'NaN-NaN-NaN') {
				res['prjPeriod'] = this.monthDiff(res['dateActualStart'] , res['dateActualEnd']) + " شهر ";
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
			
			if (res['manager']) {
				this.usersService.getUser(res['manager']).subscribe(user=>{
					res['manager'] = user['name']
				})
			}else{
				res['manager'] = "غير محدد"
			}

			this.activeProject = res;
			console.log("this.activeProject", this.activeProject.outputs.length)
			this.getAnalytics(id);

		}, (err)=>{
			console.log("error", err)
		})
	}
	getAnalytics(id){
		this.analyticsService.planAnalytics('/analytics/project/'+id).subscribe((res)=>{
			res['completed'] = this.activeProject.completed;
			res['quality'] = this.activeProject.quality;
			res['status'] = this.activeProject.status;
			this.analytics = res;
		}, (err)=>{
			console.log("err", err)
		})
	}

	monthDiff(d1, d2) {
		d1 = new Date(d1);
		d2 = new Date(d2);
	    var months;
	    var days;

	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth() + 1;
	    months += d2.getMonth() +1;

	    days = d2.getDate();
	    days -= d1.getDate();

	    var diff = {
	    	"months": months,
	    	"days": days
	    }
	    // return diff
	    return months <= 0 ? 0 : months;
	}
}
