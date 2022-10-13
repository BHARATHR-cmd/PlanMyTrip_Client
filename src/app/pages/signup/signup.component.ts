import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserServiceService,private snackbar:MatSnackBar) { }
  imagesrc="src/assets/lo.png"
public user={
  name:"",
  password:"",
  emailId:"",
  phone:"",
}

  ngOnInit(): void {
  }
  formSubmit(){
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Success','User got registered as '+data.username,'success')
        
      },(error)=>{
        console.log(error);
        this.snackbar.open('Email Id Already Exits', '', {
          duration: 3000
        });
        
      }
      );
    
   
  }

}
