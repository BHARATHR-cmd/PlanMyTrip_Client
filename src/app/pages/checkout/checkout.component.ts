import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Observable, defer, Subject, finalize } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { MemberService } from 'src/app/services/member.service';
import { OrderService } from 'src/app/services/order.service';
import { PackageService } from 'src/app/services/package.service';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';


const current_date=new Date();


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})






export class CheckoutComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor(private router:Router,private login:LoginService,private route:ActivatedRoute,private opOrder:OrderService,public datepipe: DatePipe,private opMember:MemberService,private opPackage:PackageService,private opType:TypeService) {
    const currentYear = new Date();
    // this.minDate = new Date(currentYear - 1, 0, 1);
    this.minDate=new Date(currentYear.getFullYear(),currentYear.getMonth(),currentYear.getDate())
    this.maxDate = new Date(currentYear.getFullYear(),currentYear.getMonth()+1,currentYear.getDate());
   }
  pid='';
  packagee={pid:"",
ptilte:"",pdescription:"", pimage:"",pprice:0,category:{cid:'',
  cdescription:"", cimage:"", ctitle:""
}}


loading = new Subject<boolean>()

types=[{tid:'',tprice:0,type:''}]

start_dateof_vacation!:Date;
end_dateof_vacation!:Date;

totalprice=0;

order={ 
  startDateofVacation: new Date(),
  endDateofVacation:new Date(),
  order_date_time:new Date(),
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


code=''
// ********************************************************


// form control for member fields
membername = new FormControl('', [Validators.required]); 
memberage = new FormControl('', [Validators.required,Validators.max(70),Validators.min(8),Validators.pattern('[0-9]*')]); 
membergender = new FormControl('', [Validators.required]); 

// form control for date fields

start_date = new FormControl('', [Validators.required]); 
end_date= new FormControl('', [Validators.required]); 

// form control for type fields

type_select= new FormControl('', [Validators.required]); 









reset(){
  this.discountForm.reset();
  this.discountForm.enable();
  this.dicountPrice=0;


}

Discountcodes=[{code:'FIRSTPLAN',discount_percentage:50},{code:'30OFF',discount_percentage:30},{code:'20OFF',discount_percentage:20},{code:'FOR_PARENTSOFF',discount_percentage:50}]

memberAddPrice=0;


dicountedPrice=0;
dicountPrice=this.packagee.pprice;

discountForm=new FormGroup({discountcode :new FormControl('')})


disable=false;


discountform(){
  console.log(this.code);
  if(this.code!=''){
    this.Discountcodes.forEach(element => {
      if(element.code==this.code){
        this.dicountPrice=(this.dicountPrice*(element.discount_percentage/100));
        this.dicountedPrice=(this.packagee.pprice-this.dicountPrice);
        this.discountForm.disable();
      }
      
      
    });this.totalprice=this.priceAccDates+this.packageVariantPrice+this.memberAddPrice+this.dicountPrice;
    
  }else{
    this.totalprice=this.packagee.pprice;
  }
  
}
// packageprice=0;
  ngOnInit(): void {
    
    
    // this.min_date="2022-01-01"
    this.pid=this.route.snapshot.params['pid'];
    console.log(this.dicountPrice);
    this.opPackage.getPackage(this.pid).subscribe((data:any)=>{
      this.packagee=data;
      // this.totalprice=this.packagee.pprice;
      this.dicountPrice=this.packagee.pprice;
    })
    


    // console.log(current_date.getDate()+"-"+(current_date.getMonth()+1)+"-"+current_date.getFullYear())
    
    
    
   
    
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
          this.memberAddPrice=this.memberAddPrice-1000;
          

           
        }
        })

}

packageVariantPrice=0;
discountform_toggle=true;
typePriceChange(tprice:any){
  this.packageVariantPrice=tprice;
  this.discountform_toggle=false;

  
}


  checkOutFormSubmit(){
    this.order.oprice=this.totalprice;
    this.order.packageid=this.pid;
   this.opOrder.addOrder(this.order).pipe(this.indicate(this.loading)).subscribe((data:any)=>{
      this.oid=data.oid;
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
          this.totalprice=0;
        })}
      })   
   })
    
  }

NewMembers=[{
  mage:'', mgender:'', mname:'', order:{oid:''}
}];

minPerdayPrice=1000;
addMember(){
    this.Members.push(this.member);
    console.log(this.Members);
    this.memberAddPrice=this.memberAddPrice+1000;
    
    
    this.member={mage: '', mgender: '', mname: '', order:{oid: ' '}};
    
  }

 

  //************************** */ Range Dates Settings*********************/
  number_of_days=0;
  priceAccDates=0;

  setDate(){
    if(this.end_dateof_vacation!=undefined && this.start_dateof_vacation!=undefined)
    {

       
      this.order.startDateofVacation=this.start_dateof_vacation;
      this.order.endDateofVacation=this.end_dateof_vacation;
      let Difference_In_Time = this.end_dateof_vacation.getTime() - this.start_dateof_vacation.getTime();
      console.log(Difference_In_Time);
      
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.number_of_days=Difference_In_Days+1;
      this.priceAccDates=this.number_of_days*1000;
      this.totalprice=this.priceAccDates+this.packageVariantPrice+this.memberAddPrice+this.dicountPrice;
      console.log(this.order.startDateofVacation+" to "+this.order.endDateofVacation+"="+this.number_of_days+":::"+this.priceAccDates);
          
    }
   
    
    
  }
  // ****************** Total Price Calculation****************************

  



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
