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

      this.Login.getCurrentUser().subscribe(
        (user:any)=>{
          this.Login.setUserDetails(user);
          console.log(user);
        }
      )

      
    }
    );
    
  }

  

  ngOnInit(): void {
  }

}
