import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.css']
})
export class DashboardDetailsComponent implements OnInit {

  @ViewChild("dashboardDetails") table: ElementRef;
  dashboardDetails: any;
  dashboardName: string = "";
  loggedinUser: string = localStorage.getItem('loggedinuser') || "";

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private utilityService: UtilityService) { }

  ngOnInit() {
    let detailsName = this.route.snapshot.paramMap.get("name");
    switch(detailsName){
      case "newContactsOfWeek":
        this.dashboardName = "New Contacts this week";
        break;
      case "currentActiveContacts":
        this.dashboardName = "Active Conversations";
        break;
      case "recentActiveContacts":
        this.dashboardName = "Recent Active Conversations";
        break;
    }
    
    if(typeof (this.authService[detailsName]) === "function"){

      this.utilityService.showLoader();

      this.authService[detailsName]().subscribe((data: any) => {
        console.log(data);
        this.utilityService.hideLoader();
        if(data){
          var userData = [];
          var columns = [];
          Object.keys(data[0]).forEach(elem => {
            columns.push({ title: elem });
          });
          data.forEach(elem => {
            var row = [];
            var keys = Object.keys(elem);
            for (var j = 0; j < keys.length; j++) {
              if (keys[j] === 'Reply') {
                try {
                  row.push(decodeURIComponent(elem[keys[j]]));
                } catch (err) {
                  row.push(elem[keys[j]]);
                }
              }
              else {
                row.push(elem[keys[j]]);
              }
            }
            userData.push(row);
          });

          this.dashboardDetails = $(this.table.nativeElement);
          this.dashboardDetails.DataTable({
            "processing": true,
            data: userData,
            columns: columns,
            "scrollX": true
          });
        }
      }, (err) => {
        console.log(err);
        this.utilityService.hideLoader();
      });
    }

  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

}
