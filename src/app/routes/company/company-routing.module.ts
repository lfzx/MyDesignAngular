import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListEmployeeRecommendationsComponent } from './list/employee-recommendations/employee-recommendations.component';
import { CompanyListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { CompanyBusPostsComponent } from './bus/posts/posts.component';

const routes: Routes = [

  { path: 'employeeRecommendations', component: CompanyListEmployeeRecommendationsComponent },
  { path: 'deliveries', component: CompanyListDeliveriesComponent },
  { path: 'posts', component: CompanyBusPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
