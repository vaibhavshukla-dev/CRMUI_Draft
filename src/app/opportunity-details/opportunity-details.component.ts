import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';
import { StatesModule } from '../states/states.module';

declare var $;

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.css']
})
export class OpportunityDetailsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  opportunityFormObj: any = {
    opportunityNumber:"",
    loanAmount:"",
    subType:"",
    currentAddress:"",
    zipcode:"",
    profType:"",
    loanAmountSanctioned:"",
    status:"",
    loanType:"",
    accountName:"",
    city:"",
    state:"",
    pan:""
  };

  states: any = [];

  contacts: any = [];

  editMode: boolean = false;
  opportunityForm: FormGroup;
  isDataSaved: boolean = false;
  isErrorInDataSaved: boolean = false;
  errorInDataSaved: string = "";
  submitted: boolean = false;

  @ViewChild('contact_table') table: ElementRef;
  contactTable: any;

  constructor(private authService: AuthService, private utilityService: UtilityService, private router: Router, private route: ActivatedRoute, private chRef: ChangeDetectorRef, private fb: FormBuilder, private stateModule: StatesModule) { 
    this.opportunityForm = this.fb.group({
      opportunityNumber:[''],
      loanAmount:[''],
      subType:[''],
      currentAddress:['', Validators.required],
      zipcode:['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{5}$')])],
      profType:['', Validators.required],
      loanAmountSanctioned:[''],
      status:[''],
      loanType:[''],
      accountName:[''],
      city:['', Validators.required],
      state:['', Validators.required],
      pan:['', Validators.compose([Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')])],
      loanid: ['']
    });

    this.states = this.stateModule.getStates();
  }

  updateOpportunity(){
    console.log(this.opportunityForm.value);
    this.submitted = true;
    if(this.opportunityForm.invalid){
      return false;
    }
    this.utilityService.showLoader();
    this.authService.updateOpportunity(this.opportunityForm.value).subscribe((data)=>{
      console.log(data);
      this.utilityService.hideLoader();
      this.editMode = false;
      this.isDataSaved = true;
      this.updateLoacalOpportunityCopy();
      setTimeout(()=>{
        this.isDataSaved = false;
      },5000);
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
      this.isErrorInDataSaved = true;
      this.errorInDataSaved = JSON.stringify(err);      
    });
  }

  editForm(){
    this.editMode = true;
  }

  resetForm(){
    this.editMode = false;

    this.opportunityForm.controls['opportunityNumber'].setValue(this.opportunityFormObj.opportunityNumber);
    this.opportunityForm.controls['loanAmount'].setValue(this.opportunityFormObj.loanAmount);
    this.opportunityForm.controls['subType'].setValue(this.opportunityFormObj.subType);
    this.opportunityForm.controls['currentAddress'].setValue(this.opportunityFormObj.currentAddress);
    this.opportunityForm.controls['zipcode'].setValue(this.opportunityFormObj.zipcode);
    this.opportunityForm.controls['profType'].setValue(this.opportunityFormObj.profType);
    this.opportunityForm.controls['loanAmountSanctioned'].setValue(this.opportunityFormObj.loanAmountSanctioned);
    this.opportunityForm.controls['loanType'].setValue(this.opportunityFormObj.loanType);
    this.opportunityForm.controls['status'].setValue(this.opportunityFormObj.status);
    this.opportunityForm.controls['accountName'].setValue(this.opportunityFormObj.accountName);
    this.opportunityForm.controls['city'].setValue(this.opportunityFormObj.city);
    this.opportunityForm.controls['state'].setValue(this.opportunityFormObj.state);
    this.opportunityForm.controls['pan'].setValue(this.opportunityFormObj.pan);
  }

  updateLoacalOpportunityCopy(){
    this.opportunityFormObj.opportunityNumber = this.opportunityForm.controls['opportunityNumber'].value;
    this.opportunityFormObj.loanAmount = this.opportunityForm.controls['loanAmount'].value;
    this.opportunityFormObj.subType = this.opportunityForm.controls['subType'].value;
    this.opportunityFormObj.currentAddress = this.opportunityForm.controls['currentAddress'].value;
    this.opportunityFormObj.zipcode = this.opportunityForm.controls['zipcode'].value;
    this.opportunityFormObj.profType = this.opportunityForm.controls['profType'].value;
    this.opportunityFormObj.loanAmountSanctioned = this.opportunityForm.controls['loanAmountSanctioned'].value;
    this.opportunityFormObj.loanType = this.opportunityForm.controls['loanType'].value;
    this.opportunityFormObj.status = this.opportunityForm.controls['status'].value;
    this.opportunityFormObj.accountName = this.opportunityForm.controls['accountName'].value;
    this.opportunityFormObj.city = this.opportunityForm.controls['city'].value;
    this.opportunityFormObj.state = this.opportunityForm.controls['state'].value;
    this.opportunityFormObj.pan = this.opportunityForm.controls['pan'].value;
  }

  logout(event) {
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  ngOnInit() {
    this.utilityService.showLoader();
    let opportunityId = this.route.snapshot.paramMap.get('id');
    this.authService.getOpportunityDetails(opportunityId).subscribe((data: any)=>{
      console.log(data);
      this.utilityService.hideLoader();
      if(data && data.length && typeof data === "object"){
        this.opportunityFormObj.opportunityNumber = data[0].loanaccnumber;
        this.opportunityFormObj.loanAmount = data[0].loanamount;
        this.opportunityFormObj.subType = data[0].subtype;
        this.opportunityFormObj.currentAddress = data[0].curraddress;
        this.opportunityFormObj.zipcode = data[0].zipcode;
        this.opportunityFormObj.profType = data[0].proftype;
        this.opportunityFormObj.loanAmountSanctioned = data[0].loanamtsant;
        this.opportunityFormObj.loanType = data[0].loantype;
        this.opportunityFormObj.status = data[0].status;
        this.opportunityFormObj.accountName = data[0].accountname;
        this.opportunityFormObj.city = data[0].city;
        this.opportunityFormObj.state = data[0].state;
        this.opportunityFormObj.pan = data[0].pan;

        this.opportunityForm.controls['opportunityNumber'].setValue(data[0].loanaccnumber);
        this.opportunityForm.controls['loanAmount'].setValue(data[0].loanamount);
        this.opportunityForm.controls['subType'].setValue(data[0].subtype);
        this.opportunityForm.controls['currentAddress'].setValue(data[0].curraddress);
        this.opportunityForm.controls['zipcode'].setValue(data[0].zipcode);
        this.opportunityForm.controls['profType'].setValue(data[0].proftype);
        this.opportunityForm.controls['loanAmountSanctioned'].setValue(data[0].loanamtsant);
        this.opportunityForm.controls['loanType'].setValue(data[0].loantype);
        this.opportunityForm.controls['status'].setValue(data[0].status);
        this.opportunityForm.controls['accountName'].setValue(data[0].accountname);
        this.opportunityForm.controls['city'].setValue(data[0].city);
        this.opportunityForm.controls['state'].setValue(data[0].state);
        this.opportunityForm.controls['pan'].setValue(data[0].pan);
        this.opportunityForm.controls['loanid'].setValue(opportunityId);
      }       
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });

    this.authService.getOpportunityContacts(opportunityId).subscribe((data: any)=>{
      console.log(data);
      if(data && data.length && typeof data === "object"){
        this.contacts = data;
        this.contactTable = $(this.table.nativeElement);

        this.chRef.detectChanges();

        this.contactTable.DataTable({
          "scrollX": true
        });
      }      
    },(err)=>{
      console.log(err);
    });
  }

}
