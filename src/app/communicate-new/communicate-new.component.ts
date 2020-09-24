import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { UtilityService } from '../utility.service';

declare var $;

@Component({
  selector: 'app-communicate-new',
  templateUrl: './communicate-new.component.html',
  styleUrls: ['./communicate-new.component.css']
})
export class CommunicateNewComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  currentPage: number = 1;

  contacts: any = [];

  processes: any = [];

  selectedContacts: any = [];

  isMessageSent: boolean = false;
  isErrorInMessageSent: boolean = false;
  timeinsec: number = 5;
  errorInMessageSent: string = "";

  fData: any = {
    selectedProcess: "",
    messageText: "",
    stageid: ""
  };

  @ViewChild('contact_table') table: ElementRef;
  contactTable: any;

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private chRef: ChangeDetectorRef) { }

  moveNext(pageIndex){
    this.currentPage = pageIndex;
  }

  moveBack(pageIndex){
    this.currentPage = pageIndex;
  }

  redirectToCommunicate(){
    var intervl = setInterval(()=>{
      this.timeinsec = this.timeinsec - 1;
      if(this.timeinsec === 0){
        clearInterval(intervl);
        this.router.navigate(["communicates"]);
      }
    },1000);
  }

  onProcessChange(){
    console.log(this.fData.selectedProcess);
    if(this.fData.selectedProcess){
      var currentSelectedProcess = this.processes.filter((elm)=>{
        return elm.processid == this.fData.selectedProcess;
      });
      this.fData.messageText = currentSelectedProcess[0]["StageDescription"];
      this.fData.stageid = currentSelectedProcess[0]["procstartstage"];
    }else{
      this.fData.messageText = "";
    }
    console.log(currentSelectedProcess);
  }

  selectContact(event, contactObj){
    if(event.target.checked){
      this.selectedContacts.push(contactObj);
    }else{
      var index = this.utilityService.findWithAttr(this.selectedContacts, "contactid", contactObj["contactid"]);
      this.selectedContacts.splice(index, 1);
    }
    console.log(this.selectedContacts);
  }

  //elem[keys[j]] + "@" + elem["Name"] + "@" + elem["Registered Mobile Number"] + "@" + elem["FSSAI Number"] + "@" + elem["Due Date"]

  sendMessage(e){
    e.preventDefault();
    this.utilityService.showLoader();

    var formattedContactData = this.selectedContacts.map((elm)=>{
      return elm.contactid + "@" + elm.Name + "@" + elm["Registered Mobile Number"] + "@" + elm.fssainumber + "@" + elm.duedate
    });

    const data = {
      msgBody: this.fData.messageText,
      contactData: formattedContactData,
      isFileUpload: false
    };
    console.log(data);
    
    this.authService.sendMessage(data).subscribe((data)=>{
      console.log(data);
      //this.utilityService.hideLoader();
      if(this.fData.selectedProcess !== ""){
        const contactIdArr = this.selectedContacts.map((elm)=>{
          return elm.contactid;
        });
        const iData = {
          contactIdArr:contactIdArr, 
          stageid: this.fData.stageid, 
          processid: this.fData.selectedProcess
        };
        this.authService.initiateTemplateScriptForContact(iData).subscribe((data)=>{
          this.utilityService.hideLoader();
          this.currentPage = 3;
          this.isMessageSent = true;
          this.redirectToCommunicate();
        },(err)=>{
          this.utilityService.hideLoader();
          this.currentPage = 3;
          this.isErrorInMessageSent = true;
          this.errorInMessageSent = err;
        });
      }else{
        this.utilityService.hideLoader();
        this.currentPage = 3;
        this.isMessageSent = true;
        this.redirectToCommunicate();
      }
    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
      this.currentPage = 3;
      this.isErrorInMessageSent = true;
      this.errorInMessageSent = err;
    });
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  ngOnInit() {

    this.utilityService.showLoader();

    this.authService.getContacts().subscribe((data)=>{
      this.contacts = data;
      this.utilityService.hideLoader();


      this.contactTable = $(this.table.nativeElement);
        
      this.chRef.detectChanges();

      this.contactTable.DataTable({
        "scrollX": true,
        "responsive": true,
        "scrollY": "168px",
        "scrollCollapse": true,
        "paging": false,
        "info":false,
      });

    },(err)=>{
      console.log(err);
      this.utilityService.hideLoader();
    });

    this.authService.getProcessWithStartStage().subscribe((data)=>{
      this.processes = data;
    },(err)=>{
      console.log(err);
    });
  }

}
