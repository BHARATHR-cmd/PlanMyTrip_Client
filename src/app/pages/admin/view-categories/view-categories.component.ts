import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private opCategory:CategoryService) { }

  Categories=[{
    cdescription:"", cimage:"", ctitle:""
  }];

  ngOnInit(): void {
    this.opCategory.getCategories().subscribe((data:any)=>
    {
      this.Categories=data;
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading the data")
    })  }


  


}
