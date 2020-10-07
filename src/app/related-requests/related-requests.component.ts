import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-related-requests',
  templateUrl: './related-requests.component.html',
  styleUrls: ['./related-requests.component.css']
})
export class RelatedRequestsComponent implements OnInit {
  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  contactFormObj: any = {
    contactid: "",
    name: "",
    email: "",
    dob: "",
    mobile: "",
    accountid: "",
    FSSAINumber:"",
    dueDate:""
  };

  editMode: boolean = false;
  contactForm: FormGroup;
  submitted: boolean = false;
  isDataSaved: boolean = false;
  isErrorInDataSaved: boolean = false;
  errorInDataSaved: string = "";

  @ViewChild("loanDetailsTable") table: ElementRef;
  loanDetailsTable: any;
  @ViewChild("HealthcareDetailsTable") healthtable: ElementRef;
  HealthcareDetailsTable: any;
  @ViewChild("myDocuments") myDocuments: ElementRef;
  myDocumentsTable: any;
  @ViewChild("myDoctorDocuments") myDoctorDocuments: ElementRef;
  myDoctorDocumentsTable: any;
  receivedFrom: string = "";
  sentFrom: string = "";
  conversations: any;
  communicateconversations: any = [];
  myConDocuments :any = null;
  contactDoctorDocs  :any = null;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private utilityService: UtilityService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      contactid: [''],
      name:['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^(.+)@(.+){2,}\\.(.+){2,}$')])],
      dob: ['', Validators.required],
      mobile: [''],
      accountid: [''],
      fssainumber: ['', Validators.compose([Validators.required, Validators.pattern('^([0-9]{14})$')])],
      dueDate: ['', Validators.required],
      contacttype: ['', Validators.compose([Validators.required, Validators.pattern('^((DOCTOR)|(PATIENT))$')])]
    });
  }

  editForm(){
    this.editMode = true;
  }

  resetForm(){
    this.editMode = false;

    this.contactForm.controls['contactid'].setValue(this.contactFormObj.contactid);
    this.contactForm.controls['name'].setValue(this.contactFormObj.name);
    this.contactForm.controls['email'].setValue(this.contactFormObj.email);
    this.contactForm.controls['dob'].setValue(this.contactFormObj.dob);
    this.contactForm.controls['mobile'].setValue(this.contactFormObj.mobile);
    this.contactForm.controls['accountid'].setValue(this.contactFormObj.accountid);
    this.contactForm.controls['fssainumber'].setValue(this.contactFormObj.FSSAINumber);
    this.contactForm.controls['dueDate'].setValue(this.contactFormObj.dueDate);
    this.contactForm.controls['contacttype'].setValue(this.contactFormObj.contacttype);
  }

  updateLocalContactCopy(){
    this.contactFormObj.name = this.contactForm.controls['name'].value;
    this.contactFormObj.email = this.contactForm.controls['email'].value;
    this.contactFormObj.dob = this.contactForm.controls['dob'].value;
    this.contactFormObj.FSSAINumber =this.contactForm.controls['fssainumber'].value;
    this.contactFormObj.dueDate = this.contactForm.controls['dueDate'].value;
    this.contactFormObj.contacttype = this.contactForm.controls['contacttype'].value;
  }

  ngOnInit() {
    this.utilityService.showLoader();
    let contactId = this.route.snapshot.paramMap.get('id');
    this.authService.getContact(contactId).subscribe((data: any) => {
      this.utilityService.hideLoader();
      if (data && data.length) {
        console.log(data);


        this.contactFormObj.contactid = data[0].contactid;
        this.contactFormObj.name = data[0].name;
        this.contactFormObj.email = data[0].email;
        this.contactFormObj.dob = data[0].dob ? new Date(data[0].dob).toISOString().split("T")[0] : "";
        this.contactFormObj.mobile = data[0].mobile;
        this.contactFormObj.accountid = data[0].accountid;
        this.contactFormObj.FSSAINumber = data[0].fssainumber || "";
        this.contactFormObj.dueDate = data[0].duedate ? data[0].duedate.replace("T00:00:00.000Z","") : "";
        this.contactFormObj.contacttype = data[0].contacttype;
        
        this.contactForm.controls['contactid'].setValue(data[0].contactid);
        this.contactForm.controls['name'].setValue(data[0].name);
        this.contactForm.controls['email'].setValue(data[0].email);
        this.contactForm.controls['dob'].setValue(data[0].dob ? new Date(data[0].dob).toISOString().split("T")[0] : "");
        this.contactForm.controls['mobile'].setValue(data[0].mobile);
        this.contactForm.controls['accountid'].setValue(data[0].accountid);
        this.contactForm.controls['fssainumber'].setValue(data[0].fssainumber || "");
        this.contactForm.controls['dueDate'].setValue(data[0].duedate ? data[0].duedate.replace("T00:00:00.000Z","") : "");
        this.contactForm.controls['contacttype'].setValue(data[0].contacttype);

        //this.contactFormObj.dueDate'].setValue(data[0].duedate || "");

        console.log(this.contactFormObj);

   

      }
    }, (err) => {
      this.utilityService.hideLoader();
      console.log(err);
    });

    this.authService.getHealthRequests(contactId).subscribe((data: any) => {
      if (data) {
        var loan_contacts = [];
        var columns = [];
        Object.keys(data[0]).forEach((elem) => {
          columns.push({ title: elem });
        });
        console.log(columns);
        var temp = 0;
        data.forEach(elem => {
          var row = [];
          var keys = Object.keys(elem);
          for (var j = 0; j < keys.length; j++) {
            if (keys[j] !== undefined && keys[j] === 'Loan Application Number')
              row.push(elem[keys[j]].replace(' ', '-'));
            else
              row.push(elem[keys[j]]);
          }
          loan_contacts.push(row);
        });

        this.HealthcareDetailsTable = $(this.healthtable.nativeElement);

        this.HealthcareDetailsTable.DataTable({
          "pageLength": 5,
          "lengthMenu": [[5, 10, 20, 100], [5, 10, 20, 100]],
          data: loan_contacts,
          columns: columns,
          "scrollX": true
        });

      }
    }, (err) => {
      this.utilityService.hideLoader();
      console.log(err);
    });

    this.authService.getcontactDocuments(contactId).subscribe((data: any) => {
      if (data) {
        var loan_contacts = [];
        var columns = [];
        Object.keys(data[0]).forEach((elem) => {
          columns.push({ title: elem });
        });
        console.log(columns);
        var temp = 0;
        data.forEach(elem => {
          var row = [];
          var keys = Object.keys(elem);
          for (var j = 0; j < keys.length; j++) {
            if (keys[j] !== undefined && keys[j] === 'Loan Application Number')
              row.push(elem[keys[j]].replace(' ', '-'));
            else
              row.push(elem[keys[j]]);
          }
          loan_contacts.push(row);
        });

        this.myDocumentsTable = $(this.myDocuments.nativeElement);

        this.myDocumentsTable.DataTable({
          "pageLength": 5,
          "lengthMenu": [[5, 10, 20, 100], [5, 10, 20, 100]],
          data: loan_contacts,
          columns: columns,
          "scrollX": true,
          columnDefs: [
            {
                targets:3, // Start with the last
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a target="_blank" href="'+data+'">View Profile</a>';
                    }
                    return data;
                }
            }
        ]
        });

      }
    }, (err) => {
      this.utilityService.hideLoader();
      console.log(err);
    });

    this.authService.getcontactDoctorDocs(contactId).subscribe((data: any) => {
      if (data) {
        var loan_contacts = [];
        var columns = [];
        Object.keys(data[0]).forEach((elem) => {
          columns.push({ title: elem });
        });
        console.log(columns);
        var temp = 0;
        data.forEach(elem => {
          var row = [];
          var keys = Object.keys(elem);
          for (var j = 0; j < keys.length; j++) {
            if (keys[j] !== undefined && keys[j] === 'Loan Application Number')
              row.push(elem[keys[j]].replace(' ', '-'));
            else
              row.push(elem[keys[j]]);
          }
          loan_contacts.push(row);
        });

        this.myDoctorDocumentsTable = $(this.myDoctorDocuments.nativeElement);

        this.myDoctorDocumentsTable.DataTable({
          "pageLength": 5,
          "lengthMenu": [[5, 10, 20, 100], [5, 10, 20, 100]],
          data: loan_contacts,
          columns: columns,
          "scrollX": true,
          columnDefs: [
            {
                targets:-1, // Start with the last
                render: function ( data, type, row, meta ) {
                    if(type === 'display'){
                        data = '<a target="_blank" href="'+data+'">View Profile</a>';
                    }
                    return data;
                }
            }
        ]
        });
      }
    }, (err) => {
      this.utilityService.hideLoader();
      console.log(err);
    });

    this.authService.getContactLoanApplications(contactId).subscribe((data: any) => {
      console.log(data);
      
      if (data) {
        var loan_contacts = [];
        var columns = [];
        Object.keys(data[0]).forEach((elem) => {
          columns.push({ title: elem });
        });
        console.log(columns);
        var temp = 0;
        data.forEach(elem => {
          var row = [];
          var keys = Object.keys(elem);
          for (var j = 0; j < keys.length; j++) {
            if (keys[j] !== undefined && keys[j] === 'Loan Application Number')
              row.push(elem[keys[j]].replace(' ', '-'));
            else
              row.push(elem[keys[j]]);
          }
          loan_contacts.push(row);
        });

        this.loanDetailsTable = $(this.table.nativeElement);

        this.loanDetailsTable.DataTable({
          "pageLength": 5,
          "lengthMenu": [[5, 10, 20, 100], [5, 10, 20, 100]],
          data: loan_contacts,
          columns: columns,
          "scrollX": true
        });
        console.log(this.loanDetailsTable);
        
      }
    }, (err) => {
      this.utilityService.hideLoader();
      console.log(err);
    });

  

   }

  logout(event) {
    this.authService.logout();
    this.router.navigate(["home"]);
  }
}
