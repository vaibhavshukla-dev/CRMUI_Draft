import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {

  tabName : any;
  constructor() { }

  ngOnInit() {
  }

  onTabChanged(tabName){
    this.tabName = tabName.tab['textLabel'];
  }
}
