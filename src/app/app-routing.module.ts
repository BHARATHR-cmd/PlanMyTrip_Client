import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AddCategoryComponent } from './pages/admin/admin-dashboard/add-category/add-category.component';
import { AddPackagesComponent } from './pages/admin/admin-dashboard/add-packages/add-packages.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ViewPackagesComponent } from './pages/admin/admin-dashboard/view-packages/view-packages.component';
import { ViewCategoriesComponent } from './pages/admin/admin-dashboard/view-categories/view-categories.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { UpdatePackageComponent } from './pages/admin/admin-dashboard/update-package/update-package.component';
import { UpdateCategoryComponent } from './pages/admin/admin-dashboard/update-category/update-category.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { PackageDetailComponent } from './pages/package-detail/package-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BookedPackagesComponent } from './pages/booked-packages/booked-packages.component';

const routes: Routes = [
  {
    path:"",
    component:SignupComponent,
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
  // ********************** Admin Routes **********************
  {
    path:"admin-dashboard",
    component:AdminDashboardComponent,
    // pathMatch:'full',
    canActivate:[AdminGuard],
    children:[{
      path:'',
      component:WelcomeComponent,
    },{
      path:'profile',
      component:ProfileComponent,
    },{
      path:'update-profile/:uid',
      component:UpdateProfileComponent,
    },
    {
      path:'view-category',
      component:ViewCategoriesComponent,
      
    },{
      path:'add-category',
      component:AddCategoryComponent,
    },{
      path:'add-package',
      component:AddPackagesComponent,
    },{
      path:'view-package',
      component:ViewPackagesComponent,
    },{
      path:'booked-packages',
      component:BookedPackagesComponent,
    },{
      path:'update-package/:pid',
      component:UpdatePackageComponent,
    },{
      path:'update-category/:cid',
      component:UpdateCategoryComponent,
    },{
      path:'view-package/:cid',
      component:ViewPackagesComponent,
    },{
      path:'package-order/:pid',
      component:CheckoutComponent,
    },{
      path:'package-details/:pid',
      component:PackageDetailComponent,
    },]
  },
   // ********************** Normal user Routes **********************
  {
    path:"user-dashboard",
    component:UserDashboardComponent,
    canActivate:[NormalGuard],
    children:[{
      path:'',
      component:WelcomeComponent,
    },{
      path:'profile',
      component:ProfileComponent,
    },{
      path:'update-profile/:uid',
      component:UpdateProfileComponent,
    },{
      path:'view-category',
      component:ViewCategoriesComponent,
      
    },{
      path:'view-package',
      component:ViewPackagesComponent,
    },{
      path:'view-package/:cid',
      component:ViewPackagesComponent,
    },{
      path:'package-details/:pid',
      component:PackageDetailComponent,
    },{
      path:'package-order/:pid',
      component:CheckoutComponent,
    },{
      path:'booked-packages',
      component:BookedPackagesComponent,
    },]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
