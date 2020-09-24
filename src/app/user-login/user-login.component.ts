import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  @ViewChild("incorrectPasswordMsg") div: ElementRef;
  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private formBuilder: FormBuilder) { }
  userValidState: number = 200;
  loginForm: FormGroup;
  submitted: boolean = false;
  loading = false;

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(["dashboard"]);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(event){
    debugger
    event.preventDefault();
    this.submitted = true;
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const target = event.target;
    const username = target.querySelector("#username").value;
    const password = target.querySelector("#password").value;
    console.log(username, password);

    this.utilityService.showLoader();
    
    this.authService.authenticateUser(username, password).subscribe((data) => {
      if(data["valid"]){
        localStorage.setItem('access_token', data["token"]);
        localStorage.setItem('loggedinuser', username);
        this.utilityService.hideLoader();
        this.router.navigate(["dashboard"]);
      }else{
        this.loading = false;
        this.utilityService.hideLoader();
        $(this.div.nativeElement).css("visibility","visible");
      }      
    }, (err) => {
      this.loading = false;
      this.utilityService.hideLoader();
      $(this.div.nativeElement).css("visibility","visible");
      console.log(err);
    });   
    
  }
}
