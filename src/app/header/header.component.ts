import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService) {  }

  ngOnInit() {
    
  }
  logout(event){
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}
