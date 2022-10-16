import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn=false;
  url='/user-dashboard'
  
  // user=null;
  constructor(public login:LoginService,private router:Router) { }
  

  ngOnInit(){
    this.loggedIn=this.login.isLoggedIn();
    if(this.login.getUserRole()=='ADMIN'){
      this.url='/admin-dashboard'
    }
    

   
  }
 
  logout(){
    this.login.Logout();
    this.loggedIn=false;
    // this.user=null;
    window.location.reload();
    this.router.navigate(['login'])

  }

}
