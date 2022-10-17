import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private opCategory:CategoryService,private login:LoginService) { }

  Categories=[{
    cid:'',
    cdescription:"", cimage:"", ctitle:""
  }];

  roleurl='/user-dashboard';
  showactions=false;

  ngOnInit(): void {
    if(this.login.getUserRole()=='ADMIN'){
        this.roleurl='/admin-dashboard';
        this.showactions=true
    }
    
    this.opCategory.getCategories().subscribe((data:any)=>
    {
      this.Categories=data;
      console.log(this.Categories);
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading the data")
    })  }

    delete(cid: any){
      console.log(cid);
      this.opCategory.deleteCategory(cid).subscribe((data:any)=>{
        this.Categories=this.Categories.filter((category)=>category.cid!=cid)
        
        Swal.fire("Success !!","Successfully Deleted Category ","success");
    

      },(error)=>{
        console.log(error);
        Swal.fire("Error !!","Not able to Delete","error")
      }) }

  


}
