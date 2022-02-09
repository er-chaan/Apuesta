import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// form
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class SharedModule { }
