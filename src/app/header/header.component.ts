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
  isAdmin: string = localStorage.getItem('isAdmin') || "";
  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService) {  }


  navArray = [
    { title: "Home", url: "/dashboard", type: "1", icon: "dashboard"},
    { title: "Accounts", url: "/accounts", type: "1", icon: "receipt"},
    { title: "Contacts", url: "/contacts", type: "1", icon: "contacts"},
    { title: "Requests", url: "/loanapplications", type: "1", icon: " move_to_inbox"},
    { title: "Scripts", url: "/scripts", type: "1", icon: "wysiwyg"},
    { title: "Communicate", url: "/communicates", type: "1", icon: "textsms"},
    { title: "Reports", url: "/reports", type: "1", icon: "assessment"}
  ];

  ngOnInit() {

  }
  

  logout(event){
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}