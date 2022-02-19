import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ADashboardRoutingModule } from './a-dashboard-routing.module';
import { ADashboardComponent } from './a-dashboard.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    ADashboardComponent
  ],
  imports: [
    CommonModule,
    ADashboardRoutingModule,
    SharedModule
  ]
})
export class ADashboardModule { }
