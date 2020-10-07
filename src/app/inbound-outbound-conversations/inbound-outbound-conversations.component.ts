import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';
declare var $;


@Component({
  selector: 'app-inbound-outbound-conversations',
  templateUrl: './inbound-outbound-conversations.component.html',
  styleUrls: ['./inbound-outbound-conversations.component.css']
})
export class InboundOutboundConversationsComponent implements OnInit {

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

        this.authService.getContactCommunicates(contactId).subscribe((data: any)=>{
          if(data && data.length){
            for(var i=0; i<data.length; i++){                       
              data[i]["created_at"] = new Date(data[i]["created_at"]).getTime();	
              data[i]["sms_body"] = (data[i]["sms_body"] || "").replace("{{ContactName}}", this.contactFormObj.name);	
              data[i]["sms_body"] = (data[i]["sms_body"] || "").replace("{{expiry date}}", this.contactFormObj.dueDate);			
              data[i]["sms_body"] = decodeURIComponent(data[i]["sms_body"]);
            }
            this.communicateconversations = data;
            console.log(data);
          }
        },(err)=>{
          console.log(err);
        });

      }
    }, (err) => {
      this.utilityService.hideLoader();
      console.log(err);
    });

    this.authService.getContactConversation(contactId).subscribe((data: any) => {
      this.utilityService.hideLoader();
      let conversations = [];
      let reverseCon = [];
      let conversationCount = 0;


      let sortHiConversations = function(convList){
        var hiConList = [];
        var conversationCount = 0;
        var reverseConList = [];
        for(var i=0; i<convList.length; i++){
          if(convList[i]["SMS Body"] && convList[i]["SMS Body"].toUpperCase().trim() === "HI" && convList[i]["SMS Status"] === "received"){
            hiConList.push(convList.slice(conversationCount, i));
            conversationCount = i;							
          }
        }
        hiConList.push(convList.slice(conversationCount, convList.length));
        for(var j=hiConList.length-1; j>=0; j--){
          reverseConList = reverseConList.concat(hiConList[j]);
        }
        return reverseConList;
      };


      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i]["SMS Status"] === "received" && this.receivedFrom === "") {
            this.receivedFrom = data[i]["SMS From"];
          }
          if (data[i]["SMS Status"] === "queued" && this.sentFrom === "") {
            this.sentFrom = data[i]["SMS From"];
          }
          data[i]["created_at"] = new Date(data[i]["created_at"]).getTime();

          if (data[i]["SMS Body"] && data[i]["SMS Body"].toUpperCase().trim() === "EXIT" && data[i]["SMS Status"] === "received" && i !== 0) {
            conversations.push(data.slice(conversationCount, i+1));
            conversationCount = i+1;
          }
        }
        conversations.push(data.slice(conversationCount, data.length));
        for (var j = conversations.length - 1; j >= 0; j--) {
          reverseCon.push(sortHiConversations(conversations[j]));
        }
        console.log(reverseCon);
        this.conversations = reverseCon;
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
