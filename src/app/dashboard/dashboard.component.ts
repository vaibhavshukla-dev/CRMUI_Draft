import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';
import * as _ from "lodash";
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public activeuserCount: number = 0;
  public newUsersThisWeek: number = 0;
  public recentHourResponse: number = 0;
  loggedinUser: string = localStorage.getItem('loggedinuser') || "";

  constructor(private authService: AuthService, private router: Router, private utilityService: UtilityService) { }

  ngOnInit() {
    this.utilityService.showLoader();
    this.authService.getHomeCount().subscribe((data) => {
      this.utilityService.hideLoader();
      if(data){
        this.activeuserCount = data["currentActiveContactsCount"];
        this.newUsersThisWeek = data["newContactsOfWeekCount"];
        this.recentHourResponse = data["recentConversationCount"];
      }      
    }, (err) => {
      console.log(err);
      this.utilityService.hideLoader();
    });

    this.authService.getConversations().subscribe((data) => {
      this.utilityService.hideLoader();
      if(data){
        var processSteps = {};
        var processWiseObject = _.groupBy(data, function(b:any) { return b.processid}); 
        for(var process in processWiseObject){
          processSteps[process] = _.uniqBy(processWiseObject[process], function(a:any){return a.executionseq});
        }

        var processedObj = this.filterConversationData(processSteps, processWiseObject);

        var finalObj = {
            executionSpetDesciption: [],
            process:[],
            responseTime:[]
        };

        for(var pKey in processSteps){     
            var stepColl = processSteps[pKey];
            var processName = stepColl[0].description;
            finalObj.process.push(processName);
            var avgRespTime = [];
            for(var x=0; x<stepColl.length; x++){
                var contactObj = processedObj[pKey];    
                var avgRespTimeObj = {
                    shortDescription:stepColl[x].short_description,
                    description: stepColl[x].sms_body,
                    time:0
                };                   
                for(var conKey in contactObj ){
                    var respoTimeObj = contactObj[conKey];
                    var respoT = respoTimeObj[stepColl[x].executionseq];
                    avgRespTimeObj.time = (avgRespTimeObj.time) + respoT;
                }
                avgRespTime.push(avgRespTimeObj);
            }                      
            var maxTimeStepObj = _.maxBy(avgRespTime, function(a){return a.time}); 
            finalObj.executionSpetDesciption.push(maxTimeStepObj.shortDescription);
            finalObj.responseTime.push(maxTimeStepObj.time);
            this.chartInitialize(finalObj);
        } 

      }
    }, (err) => {
      console.log(err);
      this.utilityService.hideLoader();
    });


  }

  filterConversationData(processSteps, processWiseObject){
    var contactWithStepAndResponseTime = {},
    processedObj = {};
    for(var proc in processSteps){
        var stepList = processSteps[proc];
        var stepListLen = stepList.length;                                               
        for(var i=0; i<stepListLen; i++){
            var stepId = stepList[i].executionseq;
            var processCollection = processWiseObject[proc];
            var procCollLen = processCollection.length;
            for(var j=0; j<procCollLen; j++){
                if(processCollection[j].executionseq === stepId){
                    var contactId = processCollection[j]["contactid"];
                    var responseTime = parseFloat(processCollection[j]["response_time"]);
                    if(contactWithStepAndResponseTime[contactId]){
                        if(contactWithStepAndResponseTime[contactId][stepId]){
                            var existingTime = contactWithStepAndResponseTime[contactId][stepId];
                            if(responseTime > existingTime){
                                contactWithStepAndResponseTime[contactId][stepId] = responseTime;
                            }
                        }else{
                            contactWithStepAndResponseTime[contactId][stepId] = responseTime;
                        }
                    }else{
                        var tempObj = {};
                        tempObj[stepId] = responseTime;
                        contactWithStepAndResponseTime[contactId] = tempObj;
                    }
                }
            }
        }
        processedObj[proc] = contactWithStepAndResponseTime;
    }
    return processedObj;
  }

  chartInitialize(finalObj){
    var myBarChart = new Chart(document.getElementById("most-time-spent-barchart"), {
        type: 'bar',
        data: {
            labels: finalObj.process,
            barHoverLabels: finalObj.executionSpetDesciption,
            datasets: [
                {
                    backgroundColor: ["#3e95cd", "#3e95cd"],
                    data: finalObj.responseTime
                }
            ]
        },
        options: {
            legend: { display: false },
            scales: {                
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time in minutes'
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function(t, d) {
                    return d.barHoverLabels[t[0].index];
                    }
                }
            }
        }
    });
  }

  logout(event){
    this.authService.logout();
    this.router.navigate(["home"]);
  }

}
