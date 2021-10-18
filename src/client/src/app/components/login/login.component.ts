import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { User } from '../../../../../server/shared/model/user.model'
// import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
 
 
  constructor(private router:Router) {
    
  }
  
  login() {
    this.router.navigate(['/chat'])
  }
 
}