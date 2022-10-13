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
  
  // user=null;
  constructor(public login:LoginService,private router:Router) { }
  

  ngOnInit(){
    this.loggedIn=this.login.isLoggedIn();
    

   
  }
 
  logout(){
    this.login.Logout();
    this.loggedIn=false;
    // this.user=null;
    window.location.reload();
    this.router.navigate(['login'])

  }

}
