import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { UserListJobRecommendationsComponent } from './list/job-recommendations/job-recommendations.component';
import { UserBusResumesComponent } from './bus/resumes/resumes.component';
import { Step1Component } from './bus/create-resume/step1.component';
import { RecommendDetailComponent } from './list/job-recommendations/recommend-detail/recommend-detail.component';
import { DeliveryDetailComponent } from './list/deliveries/delivery-detail/delivery-detail.component';
import { InterviewDetailComponent } from './list/interview/interview-detail/interview-detail.component';
import { InterviewComponent } from './list/interview/interview.component';

const routes: Routes = [

  { path: 'user/deliveries', component: UserListDeliveriesComponent, data: {title: '投递页'}  },
  { path: 'user/jobRecommendations', component: UserListJobRecommendationsComponent , data: {title: '推荐页'} },
  { path: 'user/resumes', component: UserBusResumesComponent, data: {title: '简历页'}},

  { path: 'user/interview', component: InterviewComponent, data: {title: '面试邀请'}},

  { path: 'user/deliveryDetail/:id', component: DeliveryDetailComponent, data: {title: '投递详情'}},
  { path: 'user/interviewDetail/:id', component: InterviewDetailComponent, data: {title: '面试邀请详情'}},
  { path: 'user/recommendDetail/:id', component: RecommendDetailComponent, data: {title: '推荐详情'}  },
  { path: 'user/createResume', component: Step1Component, data: {title: '创建个人简历'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
