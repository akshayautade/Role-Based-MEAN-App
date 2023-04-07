import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path:'',redirectTo:'dashboard',pathMatch:'full'
  },
  {
    path:'login',component: LoginComponent
  },
  {
    path:'',component: AdminLayoutComponent,
    children:[
      {
        path:'dashboard',component: DashboardComponent,canActivate:[AuthGuard]
      },
      {
        path:'update',component: RegistrationComponent,canActivate:[AuthGuard]
      },
      {
        path:'update/:id',component: RegistrationComponent,canActivate:[AuthGuard]
      },
      {
        path:'user-profile',component: UserProfileComponent,canActivate:[AuthGuard]
      },
      {
        path:'users',component: ListUsersComponent,canActivate:[AuthGuard]
      },
    ]
  },
  {
    path:'register',component: RegistrationComponent
  },
  {
    path:'**',component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
