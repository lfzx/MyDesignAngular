import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import {AdminLoginComponent} from './passport/admin-login/admin-login.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { SchoolComponent } from './school/school.component';
import { BaseComponent } from './base/base.component';
import { Step1Component } from './passport/register/step1.component';
import { Step2Component } from './passport/register/step2.component';
import { Step3Component } from './passport/register/step3.component';

const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  AdminLoginComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    SchoolComponent,
    BaseComponent,
    Step1Component,
    Step2Component,
    Step3Component
    ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
