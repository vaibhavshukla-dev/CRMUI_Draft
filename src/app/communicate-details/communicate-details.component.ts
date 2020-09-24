import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../utility.service';

declare var $;

@Component({
  selector: 'app-communicate-details',
  templateUrl: './communicate-details.component.html',
  styleUrls: ['./communicate-details.component.css']
})
export class CommunicateDetailsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild('communicate_contacts') table: ElementRef;
  contacts: any;
  contactTable: any;

  communicateObj: any = {
    communicateid: "",
    sms_body: "",
    mediaurl: "",
    medianame: "",
    created_at: "",
    accountname: ""
  };

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private utilityService: UtilityService, private chRef: ChangeDetectorRef) { }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  ngOnInit() {
    this.utilityService.showLoader();
    let communicateId = this.route.snapshot.paramMap.get('id');
    this.authService.getCommunicate(communicateId).subscribe((data) => {
      this.utilityService.hideLoader();
      if(data){
        console.log(data);
        this.communicateObj.communicateid = data[0]["id"];
        this.communicateObj.accountname = data[0]["accountname"];
        this.communicateObj.sms_body = data[0]["sms_body"];        
        this.communicateObj.medianame = data[0]["medianame"];
        this.communicateObj.mediaurl = data[0]["mediaurl"];
        this.communicateObj.created_at = data[0]["created_at"];
      }      
    }, (err) => {
      this.utilityService.hideLoader();
    });

    this.authService.getCommunicateContacts(communicateId).subscribe((data) => {
      this.contacts = data;
      this.contactTable = $(this.table.nativeElement);
        
      this.chRef.detectChanges();

      this.contactTable.DataTable({
        "scrollX": true
      });

    }, (err) => {
      this.utilityService.hideLoader();
    });
  }

}
