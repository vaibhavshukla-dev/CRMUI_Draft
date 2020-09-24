import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild("scriptTable") table: ElementRef;
  scriptTable: any;
  scripts: any = [];

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getScripts().subscribe((data: any)=>{
      this.utilityService.hideLoader();
      if(data){
        console.log(data);
        this.scriptTable = $(this.table.nativeElement);
        this.scripts = data;

        this.chRef.detectChanges();

        this.scriptTable.DataTable({
          "scrollX": true
        });
      }
    },(err)=>{
      this.utilityService.hideLoader();
    });
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }
}
