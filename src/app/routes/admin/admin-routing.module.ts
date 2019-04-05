import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListUserManagementsComponent } from './list/user-managements/user-managements.component';
import { AdminListCompanyManagementsComponent } from './list/company-managements/company-managements.component';
import { AdminListCompaniesUnconfirmedComponent } from './list/companies-unconfirmed/companies-unconfirmed.component';
import { AdminUserManagementsViewComponent } from './userManagements/view/view.component';

const routes: Routes = [

  { path: 'userManagements', component: AdminListUserManagementsComponent },
  { path: 'companyManagements', component: AdminListCompanyManagementsComponent },
  { path: 'form/:id', component: AdminUserManagementsViewComponent },
  { path: 'companiesUnconfirmed', component: AdminListCompaniesUnconfirmedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
