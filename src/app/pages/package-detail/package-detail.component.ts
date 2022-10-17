import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private opPackage:PackageService) { }
pid=0;

packagee={pid:"",
ptilte:"",pdescription:"", pimage:"",category:{cid:'',
  cdescription:"", cimage:"", ctitle:""
}}
  ngOnInit(): void {
    this.pid=this.route.snapshot.params['pid'];
    this.opPackage.getPackage(this.pid).subscribe((data:any)=>{
      console.log(data);
      this.packagee=data;
      
    })

  }


}
