import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingComponent} from './content/setting/setting.component';
import {BaseComponent} from './content/setting/base/base.component';
import {SecurityComponent} from './content/setting/security/security.component';
import { PersonalComponent } from './content/personal/personal.component';

const routes: Routes = [
  {
    path: 'account',
    children: [
      {
        path: 'center',
        component: PersonalComponent
      },
      {
        path: 'settings',
        component: SettingComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: BaseComponent,
            data: { title: '基本设置' },
          },
          {
            path: 'security',
            component: SecurityComponent,
            data: { title: '安全设置' },
          }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProRoutingModule { }
