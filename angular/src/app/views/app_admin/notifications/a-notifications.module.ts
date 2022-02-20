import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ANotificationsRoutingModule } from './a-notifications-routing.module';
import { ANotificationsComponent } from './a-notifications.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    ANotificationsComponent
  ],
  imports: [
    CommonModule,
    ANotificationsRoutingModule,
    SharedModule
  ]
})
export class ANotificationsModule { }
