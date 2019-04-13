import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminListUserManagementsComponent } from './list/user-managements/user-managements.component';
import { AdminListCompanyManagementsComponent } from './list/company-managements/company-managements.component';
import { AdminListCompaniesUnconfirmedComponent } from './list/companies-unconfirmed/companies-unconfirmed.component';

const COMPONENTS = [
  AdminListUserManagementsComponent,
  AdminListCompanyManagementsComponent,
  AdminListCompaniesUnconfirmedComponent];

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class AdminModule { }
