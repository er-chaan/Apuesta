import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ABetsComponent } from './a-bets.component';

const routes: Routes = [
  {
    path: '',
    component: ABetsComponent,
    data: {
      title: 'Bets'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ABetsRoutingModule { }
