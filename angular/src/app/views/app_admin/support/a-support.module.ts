import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ASupportRoutingModule } from './a-support-routing.module';
import { ASupportComponent } from './a-support.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    ASupportComponent
  ],
  imports: [
    CommonModule,
    ASupportRoutingModule,
    SharedModule
  ]
})
export class ASupportModule { }
