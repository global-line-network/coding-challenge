import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Home'
    },
    /* children: [
       {
        path: 'login',
        loadChildren: './views/components/components.module#ComponentsModule',
        //canActivate: [ActivateGuard]
      }
    ] */
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Users'
    },
    /* children: [
       {
        path: 'login',
        loadChildren: './views/components/components.module#ComponentsModule',
        //canActivate: [ActivateGuard]
      }
    ] */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
