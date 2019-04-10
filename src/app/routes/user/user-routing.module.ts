import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { UserListJobRecommendationsComponent } from './list/job-recommendations/job-recommendations.component';
import { UserBusResumesComponent } from './bus/resumes/resumes.component';
import { Step1Component } from './bus/create-resume/step1.component';

const routes: Routes = [

  { path: 'user/deliveries', component: UserListDeliveriesComponent },
  { path: 'user/jobRecommendations', component: UserListJobRecommendationsComponent },
  { path: 'user/resumes', component: UserBusResumesComponent },
  { path: 'user/createResume', component: Step1Component, data: {title: '创建个人简历'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
