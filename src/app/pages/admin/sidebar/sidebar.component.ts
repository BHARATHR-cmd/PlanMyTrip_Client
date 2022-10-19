import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private login:LoginService,private router:Router) { }

  show=false;
  
  show_view_category_url='view-category';
  show_view_package_url='view-package/0';

  home='/user-dashboard';
  profiile='profile'

  ngOnInit(): void {
    if(this.login.getUserRole()=="ADMIN"){
        this.show=true;
        this.home='/admin-dashboard'
        this.profiile='profile'
        // this.show_viewurl='view-category'

    }
    
  }


  logout(){
    this.login.Logout();
    // alert("Are you sure you want to Logout!!")
    this.router.navigate(['login'])

  }
  homeclick(){
    if(this.login.getUserRole()=="ADMIN"){
      this.show=true;
      this.home='/admin-dashboard'
      this.profiile='profile'

  }
  }

}
