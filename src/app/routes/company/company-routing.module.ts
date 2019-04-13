import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListEmployeeRecommendationsComponent } from './list/employee-recommendations/employee-recommendations.component';
import { CompanyListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { CompanyBusPostsComponent } from './bus/posts/posts.component';
import { CreatPostsComponent } from './bus/creat-posts/creat-posts.component';
import { PostDetailComponent } from './bus/posts/post-detail/post-detail.component';
import { InterviewComponent } from './list/interview/interview.component';
import { InterviewDetailComponent } from './list/interview/interview-detail/interview-detail.component';
import { DeliveryDetailComponent } from './list/deliveries/delivery-detail/delivery-detail.component';
import { RecommendDetailComponent } from './list/employee-recommendations/recommend-detail/recommend-detail.component';

const routes: Routes = [

  { path: 'company/employeeRecommendations', component: CompanyListEmployeeRecommendationsComponent, data: {title: '优才推荐'} },
  { path: 'company/deliveries', component: CompanyListDeliveriesComponent, data: {title: '投递情况'} },
  { path: 'company/posts', component: CompanyBusPostsComponent , data: {title: '招聘信息'} },

  { path: 'company/inerview', component: InterviewComponent , data: {title: '面试邀请'} },

  { path: 'company/deliveryDetail/:id', component: DeliveryDetailComponent, data: {title: '投递详情'}},
  { path: 'company/interviewDetail/:id', component: InterviewDetailComponent, data: {title: '面试邀请详情'}},
  { path: 'company/recommendDetail/:id', component: RecommendDetailComponent, data: {title: '推荐详情'}  },

  { path: 'company/postDetail/:id', component: PostDetailComponent , data: {title: '职位详情'}},
  { path: 'company/createPosts', component: CreatPostsComponent , data: {title: '创建职位'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
