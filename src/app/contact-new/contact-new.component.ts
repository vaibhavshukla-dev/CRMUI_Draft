import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  currentPage: number = 1;

  submitted: boolean = false;

  contactForm: FormGroup;

  accounts: any = [];

  isDataSaved: boolean = false;
  isErrorInDataSaved: boolean = false;
  errorInDataSaved: string = "";

  timeinsec: number = 5;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private utilityService: UtilityService) { 
    this.contactForm = this.fb.group({
      account: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(.+)@(.+){2,}\\.(.+){2,}$')])],
      name: ['', Validators.required],
      mobilenum: ['', Validators.compose([Validators.required, Validators.pattern('\\+\\91\\d{10}')])],
      fssainumber: ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{14})$')])],
      dueDate: ['', Validators.required]
    });
  }

  moveNext(page){
    this.submitted = true;

    if (this.contactForm.invalid) {
      if(this.contactForm.controls["account"].errors || this.contactForm.controls["dob"].errors
        || this.contactForm.controls["name"].errors || this.contactForm.controls["mobilenum"].errors
        || this.contactForm.controls["email"].errors){
          return false;
      }
    }

    this.submitted = false;
    this.currentPage = page;
  }

  moveBack(page){
    this.currentPage = page;
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  resetResponseMessages(){
    setTimeout(()=>{
      this.isDataSaved = false;
      this.isErrorInDataSaved = false;
      this.errorInDataSaved = "";
    },5000);
  }

  redirectToContacts(){
    var intval = setInterval(()=>{
      this.timeinsec = this.timeinsec - 1;
      if(this.timeinsec === 0){
        clearInterval(intval);
        this.router.navigate(["contacts"]);
      }
    },1000);
  }

  saveContact(e){
    e.preventDefault();
    this.submitted = true;
    if (this.contactForm.invalid) {
      return false;
    }
    this.utilityService.showLoader();
    this.authService.isMobileSavable({mobilenum: this.contactForm.value["mobilenum"]}).subscribe((data)=>{
      console.log(data);
      
      if(data === true){
        this.authService.saveContact(this.contactForm.value).subscribe((data)=>{
          console.log(data);
          this.utilityService.hideLoader();
          this.isDataSaved = true;
          this.redirectToContacts();
        },(err)=>{
          console.log(err);
          this.utilityService.hideLoader();
        });
      }else{
        this.utilityService.hideLoader();
        this.isErrorInDataSaved = true;
        this.errorInDataSaved = "Mobile number is already been registered. Please choose another one.";
        this.resetResponseMessages();
      }
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });
    console.log(this.contactForm.value);
  }

  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getAccounts().subscribe((data)=>{
      this.utilityService.hideLoader();
      console.log(data);
      this.accounts = data;
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });

  }

}
