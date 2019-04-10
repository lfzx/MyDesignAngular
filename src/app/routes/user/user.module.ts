import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { UserDeliveriesEditComponent } from './deliveries/edit/edit.component';
import { UserDeliveriesViewComponent } from './deliveries/view/view.component';
import { UserListJobRecommendationsComponent } from './list/job-recommendations/job-recommendations.component';
import { UserBusResumesComponent } from './bus/resumes/resumes.component';
import { Step1Component } from './bus/create-resume/step1.component';
import { Step2Component } from './bus/create-resume/step2.component';
import { Step3Component } from './bus/create-resume/step3.component';
import { Step4Component } from './bus/create-resume/step4.component';

const COMPONENTS = [
  UserListDeliveriesComponent,
  UserListJobRecommendationsComponent,
  UserBusResumesComponent];
const COMPONENTS_NOROUNT = [
  UserDeliveriesEditComponent,
  UserDeliveriesViewComponent];

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
    Step4Component
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
