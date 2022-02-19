import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ASupportComponent } from './a-support.component';

const routes: Routes = [
  {
    path: '',
    component: ASupportComponent,
    data: {
      title: 'Support'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ASupportRoutingModule { }
