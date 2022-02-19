import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ABoardRoutingModule } from './a-board-routing.module';
import { ABoardComponent } from './a-board.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    ABoardComponent
  ],
  imports: [
    CommonModule,
    ABoardRoutingModule,
    SharedModule
  ]
})
export class ABoardModule { }
