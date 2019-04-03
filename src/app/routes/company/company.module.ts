import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListEmployeeRecommendationsComponent } from './list/employee-recommendations/employee-recommendations.component';
import { CompanyListDeliveriesComponent } from './list/deliveries/deliveries.component';
import { CompanyDeliveriesEditComponent } from './deliveries/edit/edit.component';
import { CompanyDeliveriesViewComponent } from './deliveries/view/view.component';
import { CompanyBusPostsComponent } from './bus/posts/posts.component';

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
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CompanyModule { }
