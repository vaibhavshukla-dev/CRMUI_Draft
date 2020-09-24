import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

declare var $;

@Component({
  selector: 'app-communicate',
  templateUrl: './communicate.component.html',
  styleUrls: ['./communicate.component.css']
})
export class CommunicateComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild('communicate_table') table: ElementRef;
  communicateTable: any;
  communicates :any = null;

  constructor(private authService: AuthService, private router: Router, private chRef: ChangeDetectorRef, private utilityService: UtilityService) { }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getCommunicates().subscribe((data)=>{
      this.utilityService.hideLoader();
      if(data){
        console.log(data);
        this.communicates = data;
        this.communicateTable = $(this.table.nativeElement);

        this.chRef.detectChanges();
        this.communicateTable.DataTable({
          "scrollX": true,
          'columnDefs': [
            {'width': '106px', 'targets': 0, 'className': 'min-tablet-l'},
            {'width': '230px', 'targets': 1, 'className': 'min-tablet-l'},
            {'width': '150px', 'targets': 4, 'className': 'min-tablet-l'}
          ]
        });
      }
    },(err)=>{

    });
  }

}
