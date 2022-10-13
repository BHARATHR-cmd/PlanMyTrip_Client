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

  ngOnInit(): void {
  }
  logout(){
    this.login.Logout();
    // alert("Are you sure you want to Logout!!")
    this.router.navigate(['login'])

  }

}
