import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { PackageService } from 'src/app/services/package.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-package',
  templateUrl: './update-package.component.html',
  styleUrls: ['./update-package.component.css']
})
export class UpdatePackageComponent implements OnInit {

  constructor(private route:ActivatedRoute,private opPackage:PackageService,private opCategory:CategoryService) { }
  pid=1;

  package={
    pid:"",
    ptilte:"",pdescription:"", pimage:"",category:{ cid:"",
      cdescription:"", cimage:"", ctitle:""
    }
  }

  public category=[{ cid:'',
    cdescription:"", cimage:"", ctitle:""
  }];
  ngOnInit(): void {
this.pid=this.route.snapshot.params['pid']
this.opCategory.getCategories().subscribe((data:any)=>{

  this.category=data;
  console.log(this.category)
},(error)=>{
  Swal.fire('Error!!',"Error Loading Categories ","error")
});
console.log(this.pid);
this.getPackage(this.pid)

  }

  getPackage(_pid: any){
    this.opPackage.getPackage(_pid).subscribe((data:any)=>{
      this.package=data;
      console.log(this.package);
    })
  }

  packageUpdateForm(){
    console.log(this.package)

    this.opPackage.updatePackage(this.package).subscribe((data:any)=>{
      Swal.fire('Success!!',"Package successfully updated "+data.ptilte,"success")
    })
  }

}
