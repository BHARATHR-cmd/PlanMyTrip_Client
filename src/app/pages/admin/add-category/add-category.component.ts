import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }
  url:any=""
  uploadFile!:File; 
  public category={
    ctitle:"",
    cdescription:"",
    cimage:"",
    
  }
  // fileChange(event:any){
  //   console.log(event)
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener("load", () => {
  //   // convert image file to base64 string
  //   this.url = reader.result;
  //   console.log(this.url.substring(22,this.url.length))
  //   this.category.cimage=this.url.substring(22,this.url.length);
  // }, false);

  // if (file) {
  //   reader.readAsDataURL(file);
  // }
  // }

  formSubmit(){
    if(this.category.ctitle!=""||this.category.cdescription!=""){
      this.categoryService.addCategory(this.category).subscribe((data:any)=>{
      
        console.log(data);
        Swal.fire('Success',"Category got Save as "+data.ctitle)
  
      });
    }
    else{
      console.log("Error !!");
      // console.log(error);
      this.snackbar.open("Invalid Details !! Try Again","",{duration:3000} )
    }
  
  }

  }