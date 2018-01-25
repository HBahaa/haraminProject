import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { MarqueeComponent } from './components/marquee/marquee.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Navbar1Component } from './components/navbar1/navbar1.component';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { PlansComponent } from './components/plans/plans.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { StateComponent } from './components/state/state.component';
import { ListComponent } from './components/list/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { ApiService } from './services/api/api.service';
import { ProjectsService } from './services/projects/projects.service';
import { ProgramsService } from './services/programs/programs.service';
import { GoalsService } from './services/goals/goals.service';
import { GlobalService } from './services/global/global.service';


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    MarqueeComponent,
    SidebarComponent,
    Navbar1Component,
    Navbar2Component,
    PlansComponent,
    ProjectsComponent,
    ReportsComponent,
    ProgramsComponent,
    StateComponent,
    ListComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'programs/:id', component: ProgramsComponent},
      {path: 'programs', component: ProgramsComponent},
      {path: 'projects/:id', component: ProjectsComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'plans', component: PlansComponent},
      {path: '', component: HomeComponent},
    ])
  ],
  providers: [
    ApiService,
    ProjectsService,
    ProgramsService,
    GlobalService,
    GoalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
