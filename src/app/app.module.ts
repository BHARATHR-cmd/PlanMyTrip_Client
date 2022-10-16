import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './Components/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import{MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component'
import {MatTableModule} from '@angular/material/table';
import { ViewCategoriesComponent } from './pages/admin/admin-dashboard/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/admin-dashboard/add-category/add-category.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ViewPackagesComponent } from './pages/admin/admin-dashboard/view-packages/view-packages.component';
import { AddPackagesComponent } from './pages/admin/admin-dashboard/add-packages/add-packages.component';
import { UpdatePackageComponent } from './pages/admin/admin-dashboard/update-package/update-package.component';
import { UpdateCategoryComponent } from './pages/admin/admin-dashboard/update-category/update-category.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    
    ViewPackagesComponent,
    AddPackagesComponent,
    UpdatePackageComponent,
    UpdateCategoryComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,MatTableModule,MatSelectModule,
    HttpClientModule,MatListModule,MatProgressBarModule,MatTooltipModule
    ,MatSnackBarModule,MatCardModule,MatToolbarModule,MatIconModule

  ],
  providers: [authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
