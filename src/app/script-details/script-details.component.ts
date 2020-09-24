import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../utility.service';
declare var $;

@Component({
  selector: 'app-script-details',
  templateUrl: './script-details.component.html',
  styleUrls: ['./script-details.component.css']
})
export class ScriptDetailsComponent implements OnInit {

  loggedinUser: string = localStorage.getItem('loggedinuser') || "";
  @ViewChild("serviceTable") table: ElementRef;
  serviceTable: any;
  scriptName: string = "";

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.utilityService.showLoader();
    let scriptId = this.route.snapshot.paramMap.get("id");
    this.scriptName = this.route.snapshot.paramMap.get("scriptName");
    this.authService.getScriptDetails(scriptId).subscribe((data: any) => {
      this.utilityService.hideLoader();
      console.log(data);
      if (data) {
        var loan_origiantion_stages = [];
        var columns = [];
        Object.keys(data[0]).forEach(elem => {
          columns.push({ title: elem, className: "min-tablet-l" });
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
          loan_origiantion_stages.push(row);
        });

        this.serviceTable = $(this.table.nativeElement);

        console.log(loan_origiantion_stages);
        this.serviceTable.DataTable({
          "processing": true,
          data: loan_origiantion_stages,
          columns: columns,
          "scrollX": true
        });
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
