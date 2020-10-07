import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dashboard-all-conversation',
  templateUrl: './dashboard-all-conversation.component.html',
  styleUrls: ['./dashboard-all-conversation.component.css']
})
export class DashboardAllConversationComponent implements OnInit {

  single: any[] = [
    {
      "id": 1,
      "name": "Cardiology",
      "value": 20
    },
    {
      "id": 2,
      "name": "General & Laparoscopic",
      "value": 30
    },
    {
      "id": 3,
      "name": "Neurology & Neuro",
      "value": 80
    },
    {
      "id": 4,
      "name": "Medical & Surgical Oncology",
      "value": 75
    },
    {
      "id": 5,
      "name": "Urology and Andrology",
      "value": 100
    },
    {
      "id": 6,
      "name": "Gastroenterology & GI",
      "value": 95
    },
    {
      "id": 7,
      "name": "Bone & Joint Care",
      "value": 110
    },

  ];
  view: any[] = [500, 400];
  legend: boolean = true;
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
