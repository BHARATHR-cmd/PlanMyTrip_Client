import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-booked-packages',
  templateUrl: './booked-packages.component.html',
  styleUrls: ['./booked-packages.component.css']
})
export class BookedPackagesComponent implements OnInit {

  constructor(private opOrder:OrderService,private login :LoginService) { }


orders=[{
  oid: 0,
  startDateofVacation: new Date(),
  endDateofVacation:new Date(),
  orderDate_Time:new Date(),
  oprice: 0,
  type: {
      tid: 0,
      type: '',
      tprice: 0
  },
  packageid: 4,
  user: {
      userid: 0,
      name: '',
      emailId: '',
      phone: 0,
      password: '',
      username: '',
  }
}]

detailsurl='/user-dashboard/package-details/';
panelOpenState = false;
  ngOnInit(): void {
    this.panelOpenState = false;
    if(this.login.getUserRole()=="ADMIN"){
      this.detailsurl='/admin-dashboard/package-details/'
      this.opOrder.getOrders().subscribe((data:any)=>{
        this.orders= data;
        

      })

  }else{

    this.detailsurl='/user-dashboard/package-details/'
    this.opOrder.getOrders().subscribe((data:any)=>{
      data.forEach((order:any)=>{
        if(order.user.userid==this.login.getUser().userid){
          this.orders.push(order);
        }
      })

    })


  }
      
  }

}
