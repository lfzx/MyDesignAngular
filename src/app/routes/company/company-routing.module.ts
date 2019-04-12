import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListEmployeeRecommendationsComponent } from './list/employee-recommendations/employee-recommendations.component';
import { CompanyListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { CompanyBusPostsComponent } from './bus/posts/posts.component';
import { CreatPostsComponent } from './bus/creat-posts/creat-posts.component';
import { PostDetailComponent } from './bus/post-detail/post-detail.component';

const routes: Routes = [

  { path: 'company/employeeRecommendations', component: CompanyListEmployeeRecommendationsComponent },
  { path: 'company/deliveries', component: CompanyListDeliveriesComponent },
  { path: 'company/createPosts', component: CreatPostsComponent ,data:{title: '创建职位'}},
  { path: 'company/postDetail/:id', component: PostDetailComponent ,data:{title: '职位详情'}},
  { path: 'company/posts', component: CompanyBusPostsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
