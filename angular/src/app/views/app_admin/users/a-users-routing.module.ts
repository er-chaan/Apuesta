import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUsersComponent } from './a-users.component';

const routes: Routes = [
  {
    path: '',
    component: AUsersComponent,
    data: {
      title: 'Users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AUsersRoutingModule { }
