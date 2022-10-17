import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
   cid=1;
  category={ cid:'',
    cdescription:"", cimage:"", ctitle:""
  };
  constructor(private route:ActivatedRoute,private router:Router,private opCategory:CategoryService) { }

  ngOnInit(): void {
    this.cid=this.route.snapshot.params['cid'];
    this.opCategory.getCategory(this.cid).subscribe((data:any)=>{
      this.category=data;
    })

  } 

  categoryUpdateForm(){
    this.opCategory.updateCategory(this.category).subscribe((data:any)=>{
      Swal.fire('Success!!',"Package successfully updated "+data.ptilte,"success");
      this.category={ cid:'',
      cdescription:"", cimage:"", ctitle:""
    };
      this.router.navigate(['admin-dashboard/view-category']);
      console.log("router");
      
    })
    
    
    

  }

}
