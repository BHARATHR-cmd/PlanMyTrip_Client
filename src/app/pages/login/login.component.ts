import { Component, OnInit } from '@angular/core';
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
  constructor(private Login:LoginService) { }
  loginFormSubmit(){
    this.Login.generateToken(this.LoginData).subscribe((data:any)=>{
      console.log(data.token+"______generateToken()");
      this.Login.loginUser(data.token)
      let token =localStorage.setItem('token',data.token)
      console.log(localStorage.getItem("token"))
      this.SetUserDetails(data.token);
      

      
    }
    );
    
  }
  SetUserDetails(token:any){
    this.Login.getCurrentUser(token).subscribe(
      (user:any)=>{
        this.Login.setUserDetails(user);
        console.log(user);
      }
    )

  }

  

  ngOnInit(): void {
  }

}
