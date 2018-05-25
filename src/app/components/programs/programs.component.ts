import { Component } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

import { ProgramsService } from '../../services/programs/programs.service';
import { GoalsService } from '../../services/goals/goals.service';
import { UsersService } from '../../services/users/users.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent {
	id: any;
	programs: any;
	activeProgram :any = {};
	analytics:any;
	token: any;

	constructor(private programsService: ProgramsService, private goalsService: GoalsService,
				private analyticsService: AnalyticsService, private route: ActivatedRoute,
				private usersService: UsersService) {

		this.route.params.subscribe(params => {
       		this.id = params['id'];
       		if (this.id) {
       			this.getData(this.id);
       		}
       		else{
       			this.getData('1514489024091');
       		}
   		});
   		this.token = localStorage.getItem("token");
		if (this.token) {
			this.getPrograms();
		}
		
	}

	ngOnInit() {

   }
	getPrograms(){
		this.programsService.programs(this.token).then((resp)=>{
			this.programs = resp;
		}).catch(err=>{
			console.log("err", err)
		})
	}
	getData(id){
		
		this.programsService.getProgram(id, this.token).then((data)=>{
			if (data['datePlannedStart'] != 'NaN-NaN-NaN' && data['datePlannedEnd'] != 'NaN-NaN-NaN' ) {
				var period = this.monthDiff(data['datePlannedStart'] , data['datePlannedEnd']);
				// data['prgPeriod'] = this.monthDiff(data['dateActualStart'] , data['dateActualEnd']) + "شهر ";
				if (period['days'] > 0 || period['months'] > 0) {
					if(period['months'] || period['months'] != 0){
						data['prgPeriod'] = period['months'] + " شهر  "
					}
					if(period['days'] || period['days'] != 0){
						if(data['prgPeriod']) data['prgPeriod'] += period['days'] + " يوم ";
						else data['prgPeriod'] = period['days'] + " أيام/يوم ";
						
					}
				}
			}
			else{
				data['prgPeriod'] = 'غير متاح';
			}
			
			if (data['dateActualStart'] == 'NaN-NaN-NaN') {
				data['dateActualStart'] = 'غير متاح'
			}
			if (data['dateActualEnd'] == 'NaN-NaN-NaN') {
				data['dateActualEnd'] = 'غير متاح'
			}
			if (data['datePlannedStart'] == 'NaN-NaN-NaN') {
				data['datePlannedStart'] = 'غير متاح'
			}
			if (data['datePlannedEnd'] == 'NaN-NaN-NaN') {
				data['datePlannedEnd'] = 'غير متاح'
			}
			$.each(data['goals'], (index, value)=>{
				this.goalsService.getGoal(value.l1, this.token).then((goal)=>{
					value.l1 = goal['name'].replace(/\d+./, '');
				}).catch(error=>{
					console.log("error", error)
				})
			})

			if (data['manager']) {
				this.usersService.getUser(data['manager'], this.token).then(user=>{
					data['manager'] = user['name']
				}).catch(error=>{
					console.log("error", error)
				})
			}else{
				data['manager'] = "غير محدد"
			}

			data['projects'] = [];

			this.programsService.projectsOfProgram(id, this.token).then(response=>{
				$.each(response, (i, p)=>{
					data['projects'].push(p.name);
				})
				this.activeProgram = data;
				this.getAnalytics(id);
			}).catch(error=>{
				console.log("error", error)
			});
			
		}).catch(err=>{
			console.log("error", err)
		})


	}

	getAnalytics(id){
		this.analyticsService.planAnalytics('analytics/program/'+id, this.token).then((res)=>{
			res['completed'] = this.activeProgram.completed;
			res['quality'] = this.activeProgram.quality;
			res['status'] = this.activeProgram.status;
			res['passed'] = this.activeProgram.passed || -1;
			this.analytics = res;
		}).catch(err=>{
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
	    return diff
	    // return months <= 0 ? 0 : months;
	}

}
