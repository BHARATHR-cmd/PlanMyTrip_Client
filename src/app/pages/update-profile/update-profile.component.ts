import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:4200/';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {
 
  user={
    accountNonExpired: '',accountNonLocked: '',authorities: '',credentialsNonExpired: '',emailId: "",enabled: '',name: "",
    password: "",phone: "",profilepic: "",role: "",userid: '',username:""
  }
  
  constructor(private route:ActivatedRoute,private router:Router,private opUser:LoginService) { 
    
    
  }
  public uploader:FileUploader = new FileUploader({url: URL});
  uid: any='';
  ngOnInit(): void {
    this.uid=this.route.snapshot.params['uid'];
    console.log(this.uid);
    this.user=this.opUser.getUser();

    
  }

ppic='';

  formSubmit(){
    console.log(this.user);
    this.opUser.updateUserProfile(this.user).subscribe((data:any)=>{
      console.log(data);
      

      // this.router.navigate(['admin-dashboard/profile']);
      this.opUser.Logout();
      this.router.navigate(['login']);
      window.location.reload();
      // Swal.fire('Success!!',"Package successfully updated "+data.ptilte,"success");

      
    })
    
  }

}
