import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css']
})
export class PackageDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute,private opPackage:PackageService,private login:LoginService) { }
pid=0;
checkouturl='/user-dashboard/package-order/';

packagee={pid:"",
ptilte:"",pdescription:"",pprice:"", pimage:"",category:{cid:'',
  cdescription:"", cimage:"", ctitle:""
}}
  ngOnInit(): void {
    if(this.login.getUserRole()=="ADMIN"){
      this.checkouturl='/admin-dashboard/package-order/';
    }
    this.pid=this.route.snapshot.params['pid'];
    this.opPackage.getPackage(this.pid).subscribe((data:any)=>{
      console.log(data);
      this.packagee=data;
      
    })

  }


}
