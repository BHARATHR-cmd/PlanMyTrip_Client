import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private router:Router,private categoryService:CategoryService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }
  url:any=""
  uploadFile!:File; 
  public category={
    ctitle:"",
    cdescription:"",
    cimage:"",
    
  }
  
 
  // ************Formcontrol***********

  ctitle = new FormControl('', [Validators.required]); 
  cdescription = new FormControl('', [Validators.required]); 
  cimage=new FormControl('', [Validators.required]); 





  // -------------------------

  formSubmit(){
    if(this.category.ctitle!=""||this.category.cdescription!=""){
      this.categoryService.addCategory(this.category).subscribe((data:any)=>{
      
        console.log(data);
        Swal.fire('Success',"Category got Save as "+data.ctitle)
        
        // this.category={
        //   ctitle:"",
        //   cdescription:"",
        //   cimage:"",}
        
  
      });this.router.navigate(['/admin-dashboard/view-category']);
    }
    else{
      console.log("Error !!");
      // console.log(error);
      this.snackbar.open("Invalid Details !! Try Again","",{duration:3000} )
    }

    
  
  }

  }