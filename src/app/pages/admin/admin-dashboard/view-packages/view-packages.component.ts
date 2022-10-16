import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/services/package.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {

  constructor(private opPackage:PackageService) { }

  Packages=[{pid:"",
    ptilte:"title",pdescription:"title", pimage:"title",category:{
      cdescription:"title", cimage:"title", ctitle:"title"
    }
  }];

  ngOnInit(): void {
    this.getPackages();

}

getPackages(){
  this.opPackage.getPackages().subscribe((data:any)=>
    {
      this.Packages=data;
      
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading the data")
    }) 

}

pid='';

delete(pid:any){
  console.log("delete"+pid);
  this.opPackage.deletePackage(pid).subscribe((data:any)=>{
    this.Packages=this.Packages.filter((packagee)=>packagee.pid!=pid)
    Swal.fire("Success !!","Successfully deleted package","success");
    

  },(error)=>{
    console.log(error);
    Swal.fire("Error !!","Not able to Delete","error")
  }) 
}

}
