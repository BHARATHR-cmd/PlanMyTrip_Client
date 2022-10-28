import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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



  // ************Formcontrol***********

  username = new FormControl('', [Validators.email]); 
  userpassword = new FormControl('', [Validators.minLength(8)]); 




  // -------------------------
  constructor(private Login:LoginService,private router:Router,private snack :MatSnackBar) { }
  loginFormSubmit(){
    this.Login.generateToken(this.LoginData).subscribe((data:any)=>{
      console.log(data.token+"______generateToken()");
      this.Login.loginUser(data.token)

      this.Login.getCurrentUser().subscribe(
        (user:any)=>{
          this.Login.setUserDetails(user);
          console.log(user);
          localStorage.setItem('reload',"1");
          if(this.Login.getUserRole()=="ADMIN"){
            this.router.navigate(['admin-dashboard'])

          }
          else if(this.Login.getUserRole()=="NORMAL"){
            this.router.navigate(['user-dashboard'])
            

          }
            else{
              this.Login.Logout();
            }
        }
      )


      
    },
    (error)=>{
      console.log("Error !!");
      console.log(error.error.message);
      if(error.error.message=='Invalid Credentials'){
        this.snack.open("Invalid Credentials !! Try Again","",{duration:3000} )
      }
      
    }
    );
    
    
  }

  

  ngOnInit(): void {
  }

}
