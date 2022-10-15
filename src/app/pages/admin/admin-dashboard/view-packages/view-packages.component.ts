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

  Packages=[{
    ptilte:"title",pdescription:"title", pimage:"title",category:{
      cdescription:"title", cimage:"title", ctitle:"title"
    }
  }];

  ngOnInit(): void {
    this.opPackage.getPackages().subscribe((data:any)=>
    {
      this.Packages=data;
      // console.log(this.Packages[0].ptitle.toLowerCase()+"#############")
      // console.log(this.Packages[0].pdescription+"#############")
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading the data")
    }) 

}
}
