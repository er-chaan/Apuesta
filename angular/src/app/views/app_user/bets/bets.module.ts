import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BetsRoutingModule } from './bets-routing.module';
import { BetsComponent } from './bets.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    BetsComponent
  ],
  imports: [
    CommonModule,
    BetsRoutingModule,
    SharedModule
  ]
})
export class BetsModule { }
