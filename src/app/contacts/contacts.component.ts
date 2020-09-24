import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

declare var $;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild('contact_table') table: ElementRef;
  contactTable: any;
  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private chRef: ChangeDetectorRef) { }
  contacts :any = null;
  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getContacts().subscribe((data) => {
      this.utilityService.hideLoader();
      if(data){
        this.contacts = data;
        this.contactTable = $(this.table.nativeElement);
        
        this.chRef.detectChanges();

        this.contactTable.DataTable({
          "scrollX": true
        });
      }
    }, (err) => {
      this.utilityService.hideLoader();
    });
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

}
