import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-all-conversation',
  templateUrl: './dashboard-all-conversation.component.html',
  styleUrls: ['./dashboard-all-conversation.component.css']
})
export class DashboardAllConversationComponent implements OnInit {

  single: any[] = [
    {
      "name": "Cardiology",
      "value": 20
    },
    {
      "name": "General & Laparoscopic",
      "value": 30
    },
    {
      "name": "Neurology & Neuro",
      "value": 80
    },
    {
      "name": "Medical & Surgical Oncology",
      "value": 75
    },
    {
      "name": "Urology and Andrology",
      "value": 100
    },
    {
      "name": "Gastroenterology & GI",
      "value": 95
    },
    {
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

  constructor() { }

  ngOnInit() {
  }

}
