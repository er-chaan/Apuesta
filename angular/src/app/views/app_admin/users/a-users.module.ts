import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AUsersRoutingModule } from './a-users-routing.module';
import { AUsersComponent } from './a-users.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    AUsersComponent
  ],
  imports: [
    CommonModule,
    AUsersRoutingModule,
    SharedModule
  ]
})
export class AUsersModule { }
