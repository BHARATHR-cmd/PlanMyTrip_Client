import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public login:LoginService) { }
  show=true;
  updateurl=''
  
pic='https://preview.redd.it/5v6c5iffgxh91.png?width=553&format=png&auto=webp&s=73dae80c3b90d87ff08a409dd88711c4e9f935f3';

  ngOnInit(): void {
    if(this.login.getUser().profilepic!='default.jpeg'){
      this.pic=this.login.getUser().profilepic;
    }
    
    if(this.login.getUserRole()=="ADMIN"){
      this.show=true;
      this.updateurl='/admin-dashboard/update-profile/'
    }
    else{
      this.updateurl='/user-dashboard/update-profile/'
    }
  }

}
