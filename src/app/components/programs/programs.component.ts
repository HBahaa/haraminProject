import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/Rx';

import { ProgramsService } from '../../services/programs/programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
	id: any;
	programs: any;
	activeProgram :any = {};

	constructor(private route: ActivatedRoute, private programsService: ProgramsService) {

		console.log("this.route.snapshot.paramMap.get('id')", this.route.snapshot.paramMap.get('id'))

		if (this.route.snapshot.paramMap.get('id')) {
			this.getData(this.route.snapshot.paramMap.get('id'))
		}
		else{
			this.getData('1514489024091')
		}
		this.getPrograms();
	}

	getPrograms(){
		this.programsService.programs().subscribe((resp)=>{
			// console.log(resp);
			this.programs = resp;
		}, (err)=>{
			console.log(err);
		})
	}
	getData(x){
		this.programsService.getProgram(x).subscribe((data)=>{
			this.activeProgram = data
		}, (err)=>{
			console.log("error", err)
		})
	}

	ngOnInit() {
	}

}
