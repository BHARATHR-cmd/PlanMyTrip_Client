import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginData={
    username:"",
    password:""

  }
  constructor(private Login:LoginService,private router:Router,private snack :MatSnackBar) { }
  loginFormSubmit(){
    this.Login.generateToken(this.LoginData).subscribe((data:any)=>{
      console.log(data.token+"______generateToken()");
      this.Login.loginUser(data.token)

      this.Login.getCurrentUser().subscribe(
        (user:any)=>{
          this.Login.setUserDetails(user);
          console.log(user);
          if(this.Login.getUserRole()=="ADMIN"){
            this.router.navigate(['/admin-dashboard'])
          }
          else if(this.Login.getUserRole()=="NORMAL"){
            this.router.navigate(['/user-dashboard'])

          }
            else{
              this.Login.Logout();
            }
        }
      )


      
    },
    (error)=>{
      console.log("Error !!");
      console.log(error);
      this.snack.open("Invalid Details !! Try Again","",{duration:3000} )
    }
    );
    
  }

  

  ngOnInit(): void {
  }

}
