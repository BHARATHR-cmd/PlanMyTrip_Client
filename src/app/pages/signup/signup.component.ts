import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { defer, finalize, Observable, Subject } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
name: any;


  

  constructor(private userService:UserServiceService,private snackbar:MatSnackBar,private router:Router) { }
  imagesrc="src/assets/lo.png"
public user={
  name:"",
  password:"",
  emailId:"",
  phone:"",
}


// FormControl


username = new FormControl('', [Validators.pattern('[a-zA-Z]*')]); 
useremail = new FormControl('', [Validators.email]); 
userphone = new FormControl('', [Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]);  
userpassword = new FormControl('', [Validators.minLength(8)]); 




// ______________________________


loading = new Subject<boolean>()
  ngOnInit(): void {
  }
  formSubmit(){
    this.userService.addUser(this.user).pipe(
      this.indicate(this.loading)
    ).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Success','User got registered as '+data.username,'success')
        this.router.navigate(['login']);
        
      },(error)=>{
        // this.loading=false;

        console.log(error);
        this.snackbar.open('Email Id Already Exits', '', {
          duration: 3000
        });
        
      } 
      );
  }

  






  prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
      callback();
      return source;
    });
  }
  indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
      this.prepare(() => indicator.next(true)),
      finalize(() => indicator.next(false))
    )
  }

}
