import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }
  username = new FormControl('', [Validators.minLength(5), Validators.maxLength(10)]); 
  
  ngOnInit(): void {
  }

}
