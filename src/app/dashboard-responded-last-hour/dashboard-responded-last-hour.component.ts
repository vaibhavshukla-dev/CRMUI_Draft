import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-dashboard-responded-last-hour',
  templateUrl: './dashboard-responded-last-hour.component.html',
  styleUrls: ['./dashboard-responded-last-hour.component.css']
})
export class DashboardRespondedLastHourComponent implements OnInit {

  single = 0;
  timeLeft: number = 0;
  interval;


  constructor(private authService: AuthService, private utilityService: UtilityService) { 

  }

  ngOnInit() {
    this.authService.getHomeCount().subscribe((data: any) => {
      this.utilityService.hideLoader();
      console.log(data);
      if(data){
        this.single = data.recentConversationCount;
        this.startTimer(this.single);
      }         
    }, (err) => {
      console.log(err);
      this.utilityService.hideLoader();
    });
  }
  
  startTimer(param) {
    this.interval = setInterval(() => {
      if(this.timeLeft < param) {
        this.timeLeft++;
      } else {
        this.timeLeft = param;
      }
    },100)
  }

}
