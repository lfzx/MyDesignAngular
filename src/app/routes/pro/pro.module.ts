import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import { ProRoutingModule } from './pro-routing.module';
import { PersonalComponent } from './content/personal/personal.component';
import { SettingComponent } from './content/setting/setting.component';
import { BaseComponent } from './content/setting/base/base.component';
import { SecurityComponent } from './content/setting/security/security.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProRoutingModule
  ],
  declarations: [PersonalComponent, SettingComponent, BaseComponent, SecurityComponent]
})
export class ProModule { }
