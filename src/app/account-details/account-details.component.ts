import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  accountForm: FormGroup;
  editMode: boolean = false;
  accountId: any = "";
  submitted: boolean = false;
  isDataSaved: boolean = false;
  isErrorInDataSaved: boolean = false;
  errorInDataSaved: string = "";
  accountFormObj: any = {
    accountId:"",
    name:"",
    description:""
  };
  contacts: any = [];
  opportunities: any = [];
  @ViewChild('contactTable') table1: ElementRef;
  @ViewChild('loanDetailsTable') table2: ElementRef;
  contactTable: any;
  loanDetailsTable: any;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private utilityService: UtilityService, private fb: FormBuilder, private chRef: ChangeDetectorRef) { 
    this.accountForm = this.fb.group({
      accountid:[''],
      name:['', Validators.required],
      description:['']
    });
  }

  editForm(){
    this.editMode = true;
  }

  resetForm(){
    this.editMode = false;

    this.accountForm.controls['accountid'].setValue(this.accountFormObj.accountid);
    this.accountForm.controls['name'].setValue(this.accountFormObj.name);
    this.accountForm.controls['description'].setValue(this.accountFormObj.description);
  }

  updateLocalAccountCopy(){
    this.accountFormObj.accountid = this.accountForm.controls['accountid'].value;
    this.accountFormObj.name = this.accountForm.controls['name'].value;
    this.accountFormObj.description = this.accountForm.controls['description'].value;
  }

  updateAccount(){
    this.submitted = true;
    if(this.accountForm.invalid){
      return false;
    }
    this.utilityService.showLoader();
    this.authService.updateAccount(this.accountForm.value).subscribe((data)=>{
      console.log(data);
      this.utilityService.hideLoader();
      this.editMode = false;
      this.isDataSaved = true;
      this.updateLocalAccountCopy();
      setTimeout(()=>{
        this.isDataSaved = false;
      },5000);
    },(err)=>{
      this.utilityService.hideLoader();
      console.log(err);
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
    this.accountId = this.route.snapshot.paramMap.get('id'); 
    this.authService.getAccount(this.accountId).subscribe((data: any)=>{
      console.log(data);
      this.utilityService.hideLoader();
      if(data && data.length){
        this.accountFormObj.accountid = data[0].accountid;
        this.accountFormObj.name = data[0].name;
        this.accountFormObj.description = data[0].descriptions;

        this.accountForm.controls['accountid'].setValue(data[0].accountid);
        this.accountForm.controls['name'].setValue(data[0].name);
        this.accountForm.controls['description'].setValue(data[0].descriptions);
      }
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });

    this.authService.getAccountContacts(this.accountId).subscribe((data: any)=>{
      console.log(data);
      if(data && data.length){
        this.contacts = data;

        this.contactTable = $(this.table1.nativeElement);
        
        this.chRef.detectChanges();

        this.contactTable.DataTable({
          "scrollX": true
        });
      }
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });

    this.authService.getAccountOpportunities(this.accountId).subscribe((data: any)=>{
      console.log(data);
      if(data && data.length){
        this.opportunities = data;

        this.loanDetailsTable = $(this.table2.nativeElement);

        this.chRef.detectChanges();

        this.loanDetailsTable.DataTable({
          "scrollX": true
        });
      }
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });
  }

}
