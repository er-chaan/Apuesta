import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ABoardComponent } from './a-board.component';

const routes: Routes = [
  {
    path: '',
    component: ABoardComponent,
    data: {
      title: 'Board'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ABoardRoutingModule { }
