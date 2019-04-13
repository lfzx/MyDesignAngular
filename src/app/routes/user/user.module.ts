import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { UserListJobRecommendationsComponent } from './list/job-recommendations/job-recommendations.component';
import { UserBusResumesComponent } from './bus/resumes/resumes.component';
import { Step1Component } from './bus/create-resume/step1.component';
import { Step2Component } from './bus/create-resume/step2.component';
import { Step3Component } from './bus/create-resume/step3.component';
import { Step4Component } from './bus/create-resume/step4.component';
import { RecommendDetailComponent } from './list/job-recommendations/recommend-detail/recommend-detail.component';
import { InterviewComponent } from './list/interview/interview.component';
import { InterviewDetailComponent } from './list/interview/interview-detail/interview-detail.component';
import { DeliveryDetailComponent } from './list/deliveries/delivery-detail/delivery-detail.component';

const COMPONENTS = [
  UserListDeliveriesComponent,
  UserListJobRecommendationsComponent,
  UserBusResumesComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    RecommendDetailComponent,
    DeliveryDetailComponent,
    InterviewComponent,
    InterviewDetailComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
