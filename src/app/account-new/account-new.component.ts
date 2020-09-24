import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  accountForm: FormGroup;

  isSubmitted: boolean = false;

  isDataSaved: boolean = false;
  timeinsec: number = 5;

  constructor(private fb: FormBuilder, private authService: AuthService, private utilityService: UtilityService, private router: Router) {
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      accountDescription: ['']
    });
  }

  redirectToAccounts(){
    var intvl = setInterval(()=>{
      this.timeinsec = this.timeinsec - 1;
      if(this.timeinsec === 0){
        clearInterval(intvl);
        this.router.navigate(["accounts"]);
      }
    },1000);
  }

  saveAccount(e){
    e.preventDefault();
    this.isSubmitted = true;
    if(this.accountForm.invalid){
      return false;
    }
    console.log("clickde..");
    this.utilityService.showLoader();
    this.authService.saveAccount(this.accountForm.value).subscribe((data)=>{
      console.log(data);
      this.utilityService.hideLoader();
      this.isDataSaved = true;
      this.redirectToAccounts();
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  ngOnInit() {
  }

}
