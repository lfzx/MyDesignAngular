import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { UserListJobRecommendationsComponent } from './list/job-recommendations/job-recommendations.component';
import { UserBusResumesComponent } from './bus/resumes/resumes.component';

const routes: Routes = [

  { path: 'deliveries', component: UserListDeliveriesComponent },
  { path: 'jobRecommendations', component: UserListJobRecommendationsComponent },
  { path: 'resumes', component: UserBusResumesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
