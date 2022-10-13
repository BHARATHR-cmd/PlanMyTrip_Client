import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:"signup",
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent,
    // pathMatch:'full',
    canActivate:[AdminGuard],
    children:[{
      path:'',
      component:WelcomeComponent,
      // pathMatch:'full'
    },{
      path:'profile',
      component:ProfileComponent,
      // pathMatch:'full'
    }]
  },
  {
    path:"user-dashboard",
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
