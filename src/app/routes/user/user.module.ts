import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { UserDeliveriesEditComponent } from './deliveries/edit/edit.component';
import { UserDeliveriesViewComponent } from './deliveries/view/view.component';
import { UserListJobRecommendationsComponent } from './list/job-recommendations/job-recommendations.component';
import { UserBusResumesComponent } from './bus/resumes/resumes.component';

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
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
