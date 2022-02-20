import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ANotificationsComponent } from './a-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: ANotificationsComponent,
    data: {
      title: 'Notifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ANotificationsRoutingModule { }
