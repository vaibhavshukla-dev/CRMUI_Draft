import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-most-time',
  templateUrl: './dashboard-most-time.component.html',
  styleUrls: ['./dashboard-most-time.component.css']
})
export class DashboardMostTimeComponent implements OnInit {

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
    {
      "name": "Renewal",
      "value": 800
    },
    {
      "name": "Live Chat",
      "value": 127
    },
    {
      "name": "Lab Reports",
      "value": 770
    },
    {
      "name": "Insurance",
      "value": 450
    },
    {
      "name": "Home Service",
      "value": 320
    },
    {
      "name": "Customer Care",
      "value": 670
    }
  ];

 
  view: any[] = [1800, 300];
  view_mobile: any[] = [300, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Requests';
  showYAxisLabel = true;
  yAxisLabel = 'Time Spent in Minutes';
  legendPosition = 'below';
  barPadding = '32';
  roundEdges = false;

  colorScheme = {
    domain: ['#556ee6', '#f1b44c', '#34c38f', '#ff5722', '#61d264', '#8bc34a', '#009688', '#7f7f7f', 'ff5722']
  };

  @ViewChild('body') body; 


  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.body.nativeElement.width);
  }

}
