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
	token: any;

	constructor(private projectsService: ProjectsService, private analyticsService: AnalyticsService,
				private usersService: UsersService) {
		this.token = localStorage.getItem("token");
		if (this.token) {
			this.getData('1514490491256')
			this.getProjects();
		}
	}

	getProjects(){
		this.projectsService.projects(this.token).then((resp)=>{
			this.projects = resp;
		}).catch(err=>{
			console.log(err);
		})
	}

	getData(id){
		this.projectsService.getProject(id, this.token).then((res)=>{
			
			if (res['datePlannedStart'] != 'NaN-NaN-NaN' && res['datePlannedEnd'] != 'NaN-NaN-NaN' ) {
				var period = this.monthDiff(res['datePlannedStart'] , res['datePlannedEnd']);
				// res['prgPeriod'] = this.monthDiff(res['dateActualStart'] , res['dateActualEnd']) + "شهر ";
				if (period['days'] > 0 || period['months'] > 0) {
					if(period['months'] || period['months'] != 0){
						res['prgPeriod'] = period['months'] + " شهر  "
					}
					if(period['days'] || period['days'] != 0){
						if(res['prgPeriod']) res['prgPeriod'] += period['days'] + " يوم ";
						else res['prgPeriod'] = period['days'] + " أيام/يوم ";
						
					}
				}
			}
			else{
				res['prgPeriod'] = 'غير متاح';
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
				this.usersService.getUser(res['manager'], this.token).then(user=>{
					res['manager'] = user['name']
				})
			}else{
				res['manager'] = "غير محدد"
			}

			this.activeProject = res;
			this.getAnalytics(id);

		}).catch(err=>{
			console.log("error", err)
		})
	}
	getAnalytics(id){
		this.analyticsService.planAnalytics('analytics/project/'+id, this.token).then((res)=>{
			res['completed'] = this.activeProject.completed;
			res['quality'] = this.activeProject.quality;
			res['status'] = this.activeProject.status;
			res['passed'] = this.activeProject.passed || -1;
			this.analytics = res;
		}).catch(err=>{
			console.log("error", err)
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
	    return diff
	    // return months <= 0 ? 0 : months;
	}
}
