import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListEmployeeRecommendationsComponent } from './list/employee-recommendations/employee-recommendations.component';
import { CompanyListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { CompanyDeliveriesEditComponent } from './deliveries/edit/edit.component';
import { CompanyDeliveriesViewComponent } from './deliveries/view/view.component';
import { CompanyBusPostsComponent } from './bus/posts/posts.component';
import { CreatPostsComponent } from './bus/creat-posts/creat-posts.component';
import { PostDetailComponent } from './bus/post-detail/post-detail.component';
import { Step1Component } from './bus/creat-posts/step1.component';
import { Step2Component } from './bus/creat-posts/step2.component';
import { Step3Component } from './bus/creat-posts/step3.component';

const COMPONENTS = [
  CompanyListEmployeeRecommendationsComponent,
  CompanyListDeliveriesComponent,
  CompanyBusPostsComponent];
const COMPONENTS_NOROUNT = [
  CompanyDeliveriesEditComponent,
  CompanyDeliveriesViewComponent];

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    CreatPostsComponent,
    PostDetailComponent,
    Step1Component,
    Step2Component,
    Step3Component
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CompanyModule { }
