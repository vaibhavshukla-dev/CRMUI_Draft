import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild("loanAppTable") table: ElementRef;
  loanAppTable: any;
  opportunities: any = [];

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {

    this.utilityService.showLoader();
    this.authService.getLoanapplications().subscribe((data:any) => {
      this.utilityService.hideLoader();
      if(data && data.length){
        this.opportunities = data;
        
        /*
        var loanData = [];
        var columns = [];

        

        Object.keys(data[0]).forEach((elem) => {
          columns.push({ title: elem });
        });

        data.forEach(elem => {
            var row = [];
            var keys = Object.keys(elem);
            for(var j=0;j<keys.length;j++){
                row.push(elem[keys[j]]);
            }
            loanData.push(row);
        });
        */
        this.loanAppTable = $(this.table.nativeElement);

        this.chRef.detectChanges();

        this.loanAppTable.DataTable({
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
