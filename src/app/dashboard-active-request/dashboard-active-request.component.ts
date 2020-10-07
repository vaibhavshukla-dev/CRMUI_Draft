import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-active-request',
  templateUrl: './dashboard-active-request.component.html',
  styleUrls: ['./dashboard-active-request.component.css']
})
export class DashboardActiveRequestComponent implements OnInit {

  single: any[] = [
    {
      "id" : 1,
      "name": "Loan Origination",
      "value": 894
    },
    {
      "id" : 2,
      "name": "Service Request",
      "value": 500
    },
    {
      "id" : 3,
      "name": "Book a Ride",
      "value": 730
    },
    {
      "id" : 4,
      "name": "Appointment Booking",
      "value": 510
    },
    {
      "id" : 5,
      "name": "Enquiries",
      "value": 720
    },
    {
      "id" : 6,
      "name": "TeleMedicine",
      "value": 900
    },
    {
      "id" : 7,
      "name": "Doctor Request",
      "value": 900
    },

  ];
  view: any[] = [650, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  //showLabels: boolean = true;
  //isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#556ee6', '#f1b44c', '#34c38f', '#ff5722', '#61d264', '#8bc34a', '#009688', '#7f7f7f', 'ff5722']
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelect(data: any): void {

    var deptId: any;
    
    this.single.forEach(function (a) {
      if(!data["name"]){
        if (a.name == data) {
          deptId = a.id;
        }
      }else{
        if (a.name == data.name) {
          deptId = a.id;
        }
      }
     

    });
    
    this.router.navigate(['../ac-details' , {id: deptId}], { relativeTo: this.route });
  }

}
