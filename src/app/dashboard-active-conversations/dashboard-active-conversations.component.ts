import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-dashboard-active-conversations',
  templateUrl: './dashboard-active-conversations.component.html',
  styleUrls: ['./dashboard-active-conversations.component.css']
})
export class DashboardActiveConversationsComponent implements OnInit {
  
  single = 0;
  timeLeft: number = 0;
  interval;

  constructor(private authService: AuthService, private utilityService: UtilityService) { 
  }

  ngOnInit() {
    this.authService.getHomeCount().subscribe((data: any) => {
      this.utilityService.hideLoader();
      if(data){
        this.single = data.currentActiveContactsCount;
        this.startTimer(this.single);
      }      
    }, (err) => {
      console.log(err);
      this.utilityService.hideLoader();
    });
  }

  startTimer(param) {
    console.log('value is ' + param)
    this.interval = setInterval(() => {
      if(this.timeLeft < param) {
        this.timeLeft++;
      } else {
        this.timeLeft = param;
      }
    },100)
  }
  
}
