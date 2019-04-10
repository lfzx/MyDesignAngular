import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { BaseComponent } from './base/base.component';
import { SchoolComponent } from './school/school.component';
import { AdminLoginComponent } from './passport/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘'} },
      { path: 'exception', loadChildren: './exception/exception.module#ExceptionModule' },
      { path: '', loadChildren: './user/user.module#UserModule' },
      { path: '', loadChildren: './company/company.module#CompanyModule' },
      { path: '', loadChildren: './admin/admin.module#AdminModule' },
      {path: 'base', component: BaseComponent},
      {path: 'school', component: SchoolComponent},
      // 业务子模块
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录'} },
      { path: 'register', component: UserRegisterComponent, data: { title: '企业注册'} },
      { path: 'adminlogin', component: AdminLoginComponent, data: { title: '管理员登录'} },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏'} },
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
