import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListUserManagementsComponent } from './list/user-managements/user-managements.component';
import { AdminListCompanyManagementsComponent } from './list/company-managements/company-managements.component';
import { AdminListCompaniesUnconfirmedComponent } from './list/companies-unconfirmed/companies-unconfirmed.component';

const routes: Routes = [

  { path: 'admin/userManagements', component: AdminListUserManagementsComponent },
  { path: 'admin/companyManagements', component: AdminListCompanyManagementsComponent },
  { path: 'admin/companiesUnconfirmed', component: AdminListCompaniesUnconfirmedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
