import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank.component';
import { SharedModule } from '../../../core/shared.module';


@NgModule({
  declarations: [
    BankComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    SharedModule
  ]
})
export class BankModule { }
