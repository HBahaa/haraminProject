import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProgramsService } from '../../services/programs/programs.service';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
	id: any;
	programs: any;
	activeProject :any = {};

	constructor(private route: ActivatedRoute, private programsService: ProgramsService) {

		if (this.route.snapshot.paramMap.get('id')) {
			this.id = this.route.snapshot.paramMap.get('id');
		}else{
			this.id = 1514489024091;
		}
		this.getPrograms();
	}

	getPrograms(){
		this.programsService.programs().subscribe((resp)=>{
			console.log(resp);
			this.programs = resp;
		}, (err)=>{
			console.log(err);
		})
	}

	ngOnInit() {
	}

}
