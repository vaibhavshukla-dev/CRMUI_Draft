import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { UtilityService } from '../utility.service';
import { StatesModule } from '../states/states.module';

@Component({
  selector: 'app-opportunity-new',
  templateUrl: './opportunity-new.component.html',
  styleUrls: ['./opportunity-new.component.css']
})
export class OpportunityNewComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  currentPage: number = 1;

  accounts: any = [];
  contacts: any = [];

  opportunityForm: FormGroup;

  subTypes: any = {
		Loan: [{key:"Personal Loan",value:"Personal Loan"},{key:"Consumer Loan",value:"Consumer Loan"},{key:"Auto Loan",value:"Auto Loan"},{key:"Home Loan",value: "Home Loan"},{key:"Business Loan",value: "Business Loan"},{key:"Retail Loan",value: "Retail Loan"}],
		Order: [{key:"Order", value: "Order"}],
		Invoice: [{key:"Invoice", value: "Invoice"}]
  };

  subTypesOfType: any = [];

  states: any = [];

  isSubmitted: boolean = false;

  isDataSaved: boolean = false;
  isErrorInDataSaved: boolean = false;
  timeinsec: number = 5;
  errorInDataSaved:string = "";

  @ViewChild('subtype') subtypeElm: ElementRef;

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private statesModule: StatesModule, private fb: FormBuilder) { 
    this.states = this.statesModule.getStates();
    this.opportunityForm = this.fb.group({
      account: ['', Validators.required],
      type: ['', Validators.required],
      contact: ['', Validators.required],
      curraddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{5}$')])],
      proftype: ['SA', Validators.required],
      pan: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')])],
      loanamount: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
  }

  moveNext(pageIndex){
    this.isSubmitted = true;
    if(this.opportunityForm.invalid){
      if(pageIndex === 2 && (this.opportunityForm.controls["account"].errors || this.opportunityForm.controls["contact"].errors || this.opportunityForm.controls["type"].errors)){        
        return false;
      }
      
      if(pageIndex === 3 && (this.opportunityForm.controls["curraddress"].errors || this.opportunityForm.controls["state"].errors || this.opportunityForm.controls["city"].errors || this.opportunityForm.controls["zipcode"].errors)){
        return false;
      }
    }
    this.isSubmitted = false;
    this.currentPage = pageIndex;
  }

  moveBack(pageIndex){
    this.currentPage = pageIndex;
  }

  typeChange(){
    this.subTypesOfType = this.subTypes[this.opportunityForm.value["type"]] || [];
  }

  redirectToOpportunity(){
    var intevl = setInterval(()=>{
      this.timeinsec = this.timeinsec - 1;
      if(this.timeinsec === 0){
        clearInterval(intevl);
        this.router.navigate(["loanapplications"]);
      }
    },1000);
  }

  saveOpportunity(e){
    e.preventDefault();
    this.isSubmitted = true;
    if(this.opportunityForm.invalid){
      return false;
    }

    const oppData = {
      accountid: this.opportunityForm.value["account"], 
      contactid: this.opportunityForm.value["contact"], 
      loanamount: this.opportunityForm.value["loanamount"], 
      status: "Disbursed", 
      loantype: this.opportunityForm.value["type"], 
      subtype: this.subtypeElm.nativeElement.value, 
      curraddress: this.opportunityForm.value["curraddress"],
      city: this.opportunityForm.value["city"], 
      state: this.opportunityForm.value["state"], 
      zipcode: this.opportunityForm.value["zipcode"], 
      proftype: this.opportunityForm.value["proftype"], 
      pan: this.opportunityForm.value["pan"]
    };

    this.utilityService.showLoader();

    console.log(oppData);
    this.authService.saveOpportunity(oppData).subscribe((data)=>{
      this.utilityService.hideLoader();
      this.isDataSaved = true;
      this.redirectToOpportunity();
    },(err)=>{
      this.utilityService.hideLoader();
      this.isErrorInDataSaved = true;
      this.errorInDataSaved = JSON.stringify(err);
    });
    
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getAccounts().subscribe((data)=>{
      this.accounts = data;
      this.utilityService.hideLoader();
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });

    this.authService.getContacts().subscribe((data)=>{
      this.contacts = data;
      this.utilityService.hideLoader();
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });
  }

}
