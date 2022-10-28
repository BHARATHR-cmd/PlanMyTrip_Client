import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { PackageService } from 'src/app/services/package.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-packages',
  templateUrl: './add-packages.component.html',
  styleUrls: ['./add-packages.component.css']
})
export class AddPackagesComponent implements OnInit {

  constructor(private opPackage:PackageService,private snackbar:MatSnackBar,private opCategory:CategoryService) { }
  package={
    ptilte:"",pdescription:"", pimage:"",pprice:'',category:{ cid:1,
    
    }}

  public category=[{ cid:'',
    cdescription:"", cimage:"", ctitle:""
  }];



  // ************Formcontrol***********

  ptilte = new FormControl('', [Validators.required]); 
  pdescription = new FormControl('', [Validators.required]); 
  cimage=new FormControl('', [Validators.required]); 
  pimage = new FormControl('', [Validators.required]); 
  pprice = new FormControl('', [Validators.required,Validators.pattern('[0-9]*')]); 
  cid=new FormControl('', [Validators.required]); 





  // -------------------------


  ngOnInit(): void {
    this.opCategory.getCategories().subscribe((data:any)=>{

      this.category=data;
      console.log(this.category)
    },(error)=>{
      Swal.fire('Error!!',"Error Loading Categories ","error")
    });

  }
  toggleSubmitb=false;

  toggleSubmit(){
    this.toggleSubmitb=true

  }
  packageFormSubmit(){
    if(this.package.ptilte!=""||this.package.pdescription!=""||this.package.pimage!=""||this.package.pprice!=""){
     this.opPackage.addPackage(this.package).subscribe((data:any)=>{
      console.log(data);
      Swal.fire('Success',"Category got Save as "+data.ptilte,"success");
      this.package={
        ptilte:"",pdescription:"", pimage:"",pprice:'',category:{ cid:0,
        
        }}
        this.toggleSubmitb=false
     });
    }
    else{
      console.log("Error !!");
      // console.log(error);
      this.snackbar.open("Invalid Details !! Try Again","",{duration:3000} )
    }
  
  }

}
