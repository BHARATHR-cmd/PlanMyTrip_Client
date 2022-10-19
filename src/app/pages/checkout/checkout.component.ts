import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, defer, Subject, finalize } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { MemberService } from 'src/app/services/member.service';
import { OrderService } from 'src/app/services/order.service';
import { PackageService } from 'src/app/services/package.service';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router:Router,private login:LoginService,private route:ActivatedRoute,private opOrder:OrderService,public datepipe: DatePipe,private opMember:MemberService,private opPackage:PackageService,private opType:TypeService) { }
  pid='';
  packagee={pid:"",
ptilte:"",pdescription:"", pimage:"",pprice:0,category:{cid:'',
  cdescription:"", cimage:"", ctitle:""
}}


loading = new Subject<boolean>()

types=[{tid:'',tprice:0,type:''}]

start_dateof_vacation:string|null='';
end_dateof_vacation:string|null=''

totalprice=0;

order={
  startDateofVacation: '',
  endDateofVacation:'',
      oprice: 0,packageid:'',
      type: {tid: ''},
      user: {userid: this.login.getUser().userid}
  }


  member={
    mage:'', mgender:'', mname:'', order:{oid:''}
  }




Members=[{
  mage:'', mgender:'', mname:'', order:{oid:''}
}];











// ********************************************************
range = {start:'',end:''}
// ********************************************************


// packageprice=0;
  ngOnInit(): void {
    this.pid=this.route.snapshot.params['pid'];
    console.log(this.pid);
    this.opPackage.getPackage(this.pid).subscribe((data:any)=>{
      this.packagee=data;
      this.totalprice=this.packagee.pprice;
      // this.packageprice=this.packagee.pprice;
    })

   
// getting Types

    this.opType.getTypes().subscribe((data:any)=>{
      this.types=data;
      console.log(this.types); 
      
    })
  }
  // ******************************
  oid=''
    // ******************************


    removeMember(mname:any){
      this.Members.forEach((member:any)=>{
        if(member.mname==mname){
          console.log(this.Members.pop());
           
        }
        })

}


typePriceChange(tprice:any){
  this.totalprice=this.packagee.pprice;
  this.totalprice=this.totalprice+tprice;
  console.log(this.totalprice);
  
}


  checkOutFormSubmit(){
    this.order.oprice=this.totalprice;
    this.order.packageid=this.pid;
   this.opOrder.addOrder(this.order).pipe(this.indicate(this.loading)).subscribe((data:any)=>{
      
      this.oid=data.oid;
      // console.log(data);
      
      this.NewMembers=[];
      this.Members.forEach((member:any)=>{
        if(member.mname!=''){
          member.order.oid=this.oid;
          this.NewMembers.push(member)
        }
       
        
      }) 
      console.log(this.Members);
      this.Members.forEach((member:any)=>{
        if(member.mname!=''){
        this.opMember.addMember(member).subscribe((data:any)=>{
          console.log(data);
          Swal.fire('Success',"Your Order was succcessfull","success")
          this.Members=[];
          this.order.type.tid='';
          this.end_dateof_vacation=''
          this.start_dateof_vacation='';
          this.totalprice=0;
          

          // this.router.navigate(['profile']);
          

           
        })}
      })
  
      

   })
    
  }

NewMembers=[{
  mage:'', mgender:'', mname:'', order:{oid:''}
}];
addMember(){
    this.Members.push(this.member);
    console.log(this.Members);
    this.member={mage: '', mgender: '', mname: '', order:{oid: ''}};
  }


  setDate(){
    console.log("Before");
    
    if(this.end_dateof_vacation!=null && this.start_dateof_vacation!=null)
    {
      this.end_dateof_vacation =this.datepipe.transform(this.end_dateof_vacation, 'yyyy-MM-dd');
      this.start_dateof_vacation =this.datepipe.transform(this.start_dateof_vacation, 'yyyy-MM-dd');

      this.order.startDateofVacation=this.start_dateof_vacation+"";
      this.order.endDateofVacation=this.end_dateof_vacation+"";

      console.log(this.order.startDateofVacation+" to "+this.order.endDateofVacation);
      
    }
   
    
    
  }


  prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
      callback();
      return source;
    });
  }
  indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
      this.prepare(() => indicator.next(true)),
      finalize(() => indicator.next(false))
    )
  }

}
