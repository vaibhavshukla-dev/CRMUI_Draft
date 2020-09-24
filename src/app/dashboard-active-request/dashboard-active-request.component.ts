import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-active-request',
  templateUrl: './dashboard-active-request.component.html',
  styleUrls: ['./dashboard-active-request.component.css']
})
export class DashboardActiveRequestComponent implements OnInit {

  single: any[] = [
    {
      "name": "Loan Origination",
      "value": 894
    },
    {
      "name": "Service Request",
      "value": 500
    },
    {
      "name": "Book a Ride",
      "value": 730
    },
    {
      "name": "Appointment Booking",
      "value": 510
    },
    {
      "name": "Enquiries",
      "value": 720
    },
    {
      "name": "TeleMedicine",
      "value": 900
    },
    {
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

  constructor() { }

  ngOnInit() {
  }

}
