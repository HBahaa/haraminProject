import { Component } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

import { ProgramsService } from '../../services/programs/programs.service';
import { GoalsService } from '../../services/goals/goals.service';
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

	constructor(private programsService: ProgramsService, private goalsService: GoalsService,
				private analyticsService: AnalyticsService, private route: ActivatedRoute) {

		this.route.params.subscribe(params => {
       		this.id = params['id'];
       		if (this.id) {
       			this.getData(this.id);
       		}
       		else{
       			this.getData('1514489024091');
       		}
   		});
		
		this.getPrograms();
	}

	ngOnInit() {

   }
	getPrograms(){
		this.programsService.programs().subscribe((resp)=>{
			this.programs = resp;
		}, (err)=>{
			console.log(err);
		})
	}
	getData(id){
		this.getAnalytics(id);
		this.programsService.getProgram(id).subscribe((data)=>{
			if (data['dateActualStart'] != 'NaN-NaN-NaN' && data['dateActualEnd'] != 'NaN-NaN-NaN' ) {
				data['prgPeriod'] = this.monthDiff(data['dateActualStart'] , data['dateActualEnd']) + "شهر ";
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
				this.goalsService.getGoal(value.l1).subscribe((goal)=>{
					value.l1 = goal['name'].replace(/\d+./, '');
				})
				// if (value.l2) {
				// 	this.goalsService.getGoal(value.l2).subscribe((subGoal)=>{
				// 		value.l2 = subGoal['name'].replace(/\d+./, '');
				// 	})
				// }
			})
			data['projects'] = [];
			// this.projectsService.projectsInProgram().subscribe(prjs=>{

			// 	console.log("prjs", prjs)
				
			// 	// $.each(prjs, (i, p)=>{
			// 	// 	this.activeProgram.projects.push(p.name);
			// 	// })
			// 	// console.log("activeProgram", this.activeProgram);
			// 	// this.activeProgram = data
			// }, (err)=>{
			// 	console.log("error", err)
			// })

			var settings = {
					"async": true,
					"crossDomain": true,
					"url": "http://35.190.171.93:8001/api/project/list",
					"method": "POST",
					"headers": {
					"content-type": "application/json",
					"cache-control": "no-cache",
					"postman-token": "29e34188-41c2-39de-6e02-c4a7590d46f2",
        			"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
					"Access-Control-Allow-Origin":"*",
					"Allow-Control-Allow-Origin":"*"
				},
				"processData": false,
				"data": `{\"program\": ${id}}`
				// "data": "{\"program\": \"1514489024091\"}"
			}

			$.ajax(settings).done((response)=>{
				$.each(response, (i, p)=>{
					data['projects'].push(p.name);
				})
				this.activeProgram = data
			});

			
		}, (err)=>{
			console.log("error", err)
		})


	}

	getAnalytics(id){
		this.analyticsService.planAnalytics('/analytics/program/'+id).subscribe((res)=>{
			console.log(this.activeProgram);
			res['completed'] = this.activeProgram.completed;
			res['quality'] = this.activeProgram.quality;
			res['status'] = this.activeProgram.status;

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
