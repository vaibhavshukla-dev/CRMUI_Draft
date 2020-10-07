import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-most-time',
  templateUrl: './dashboard-most-time.component.html',
  styleUrls: ['./dashboard-most-time.component.css']
})
export class DashboardMostTimeComponent implements OnInit {

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
    {
      "id" : 8,
      "name": "Renewal",
      "value": 800
    },
    {
      "id" : 9,
      "name": "Live Chat",
      "value": 127
    },
    {
      "id" : 10,
      "name": "Lab Reports",
      "value": 770
    },
    {
      "id" : 11,
      "name": "Insurance",
      "value": 450
    },
    {
      "id" : 12,
      "name": "Home Service",
      "value": 320
    },
    {
      "id" : 13,
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


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(this.body.nativeElement.width);
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
