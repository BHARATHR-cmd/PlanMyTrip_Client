import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PackageService } from 'src/app/services/package.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {

  constructor(private login:LoginService,private route:ActivatedRoute,private opPackage:PackageService) { }

  Packages=[{pid:"",
  ptilte:"",pdescription:"", pimage:"",category:{cid:'',
    cdescription:"", cimage:"", ctitle:""
  }}
  ];

  cid=0;
  showactions=false;
  detailsurl='/user-dashboard/package-details/'

  ngOnInit(): void {
    if(this.login.getUserRole()=="ADMIN"){
      this.showactions=true
      this.detailsurl='/admin-dashboard/package-details/'

  }
      this.cid=this.route.snapshot.params['cid']
      this.getPackages(this.cid);
  
   
    
}

getPackages(cid: any){
  this.opPackage.getPackages().subscribe((data:any)=>
    {
      if(cid!=0){
        this.Packages=[];
      data.forEach((packagee:any)=>{
        if(packagee.category.cid==cid){
          this.Packages.push(packagee);
        }
        
      })
      }
      else{
        this.Packages=data;
      }
      
      
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
function packagee(value: { pid: string; ptilte: string; pdescription: string; pimage: string; category: { cdescription: string; cimage: string; ctitle: string; }; }, index: number, array: { pid: string; ptilte: string; pdescription: string; pimage: string; category: { cdescription: string; cimage: string; ctitle: string; }; }[]): void {
  throw new Error('Function not implemented.');
}

