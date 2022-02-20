import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../app/core/admin.guard';
import { UsersGuard } from '../app/core/users.guard';
import { GuestsGuard } from '../app/core/guests.guard';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule),
    // canActivate: [GuestsGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'board',
        loadChildren: () => import('./views/app_user/board/board.module').then(m => m.BoardModule)
      },
      {
        path: 'bets',
        loadChildren: () => import('./views/app_user/bets/bets.module').then(m => m.BetsModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./views/app_user/wallet/wallet.module').then(m => m.WalletModule)
      },
      {
        path: 'bank',
        loadChildren: () => import('./views/app_user/bank/bank.module').then(m => m.BankModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./views/app_user/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./views/app_user/support/support.module').then(m => m.SupportModule)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule)
      }
    ],
    canActivate: [UsersGuard]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'board',
        loadChildren: () => import('./views/app_admin/board/a-board.module').then(m => m.ABoardModule)
      },
      {
        path: 'bets',
        loadChildren: () => import('./views/app_admin/bets/a-bets.module').then(m => m.ABetsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/app_admin/dashboard/a-dashboard.module').then(m => m.ADashboardModule)
      },
      {
        path: 'support',
        loadChildren: () => import('./views/app_admin/support/a-support.module').then(m => m.ASupportModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/app_admin/notifications/a-notifications.module').then(m => m.ANotificationsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./views/app_admin/users/a-users.module').then(m => m.AUsersModule)
      },
    ],
    canActivate: [UsersGuard]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
