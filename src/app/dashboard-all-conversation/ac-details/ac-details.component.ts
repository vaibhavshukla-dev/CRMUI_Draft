import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ac-details',
  templateUrl: './ac-details.component.html',
  styleUrls: ['./ac-details.component.css']
})
export class AcDetailsComponent implements OnInit {

  deptId: any;
  private sub: any;
  single: any[] = [
    {
      "id": 1,
      "name": "Cardiology",
      "value": 20,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },
    {
      "id": 2,
      "name": "General & Laparoscopic",
      "value": 30,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },
    {
      "id": 3,
      "name": "Neurology & Neuro",
      "value": 80,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },
    {
      "id": 4,
      "name": "Medical & Surgical Oncology",
      "value": 75,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },
    {
      "id": 5,
      "name": "Urology and Andrology",
      "value": 100,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },
    {
      "id": 6,
      "name": "Gastroenterology & GI",
      "value": 95,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },
    {
      "id": 7,
      "name": "Bone & Joint Care",
      "value": 110,
      "requests": [{
        "date": "01/01/2020",
        "time": "09:45:30",
        "type": "Loan Origination",
        "duration": '230'
      },
      {
        "date": "02/02/2020",
        "time": "09:45:30",
        "type": "Service Request",
        "duration": '230'
      },
      {
        "date": "03/03/2020",
        "time": "09:45:30",
        "type": "Book a ride",
        "duration": '230'
      },
      {
        "date": "04/04/2020",
        "time": "09:45:30",
        "type": "Enquires",
        "duration": '230'
      },
      {
        "date": "05/05/2020",
        "time": "09:45:30",
        "type": "Telemedicine",
        "duration": '230'
      },
      {
        "date": "06/06/2020",
        "time": "09:45:30",
        "type": "Renewal",
        "duration": '230'
      },
      ]
    },

  ];
  renderArray: any;
  requests: any;
  title: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


    console.log(this.single[0].requests[1])

    this.sub = this.route.params.subscribe(params => {
      
      this.deptId = +params['id'];
    });

    console.log(this.deptId);
    
    this.renderArray = this.getRenderData(this.deptId); 
    console.log(this.renderArray);
    
    this.requests = this.renderArray[0].requests;
    this.title = this.renderArray[0].name;

  }

  getRenderData(deptId: any) {

    var tempArray = [];

    this.single.forEach(function (a) {
      if (a.id == deptId) {
        tempArray.push(a);
      }

    });
   

    return tempArray;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
