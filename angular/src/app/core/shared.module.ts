import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// form
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// data table
import { DataTablesModule } from "angular-datatables";

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [
    ModalModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class SharedModule { }
