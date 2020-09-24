import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

declare var $;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild('accountTable') table: ElementRef;
  accountTable: any;
  accounts: any = [];

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private chRef: ChangeDetectorRef) { }
  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getAccounts().subscribe((data: any) => {
      this.utilityService.hideLoader();
      if(data && data.length){       
        console.log(data);
        this.accounts = data;
        this.accountTable = $(this.table.nativeElement);
        
        this.chRef.detectChanges();

        this.accountTable.DataTable({
            responsive: true,
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
