import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ABetsRoutingModule } from './a-bets-routing.module';
import { ABetsComponent } from './a-bets.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    ABetsComponent
  ],
  imports: [
    CommonModule,
    ABetsRoutingModule,
    SharedModule
  ]
})
export class ABetsModule { }
