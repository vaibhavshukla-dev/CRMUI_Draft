import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RDataService } from '../r-data.service';

@Component({
  selector: 'app-report-head',
  templateUrl: './report-head.component.html',
  styleUrls: ['./report-head.component.css']
})
export class ReportHeadComponent implements OnInit {

  constructor(private rDataService: RDataService) { }

  headerForm: FormGroup;
  department: any;
  fromDate: any;
  toDate: any;

  departmentArray = [
    { id: "1", value: "Loan Origination" },
    { id: "2", value: "Service Request" },
    { id: "3", value: "Book a Ride" },
    { id: "4", value: "Appointment Booking" },
    { id: "5", value: "Enquiries" },
    { id: "6", value: "TeleMedicine" },
    { id: "7", value: "Doctor Request" },
    { id: "8", value: "Renewal" },
    { id: "9", value: "Live Chat" },
    { id: "10", value: "Lab Reports" },
    { id: "12", value: "Insurance" },
    { id: "12", value: "Home Service" },
    { id: "13", value: "Customer Care" }];

  dataArray = [
    { id: "1", value: "Loan Origination", name: "Praveer Darbeshwar", date: "2020-09-01", time: "600"},
    { id: "2", value: "Service Request", name: "Anjali Waghmare", date: "2020-09-02", time: "600" },
    { id: "3", value: "Book a Ride", name: "Shubham Bodade", date: "2020-09-03", time: "600" },
    { id: "4", value: "Appointment Booking", name: "Rahul Dahake", date: "2020-09-04", time: "600" },
    { id: "5", value: "Enquiries", name: "Tushar Narang", date: "2020-09-05", time: "600" },
    { id: "6", value: "TeleMedicine", name: "Shantanu Bahadure", date: "2020-09-01", time: "600" },
    { id: "7", value: "Doctor Request", name: "Roshan Flora", date: "2020-09-02", time: "600" },
    { id: "8", value: "Renewal", name: "Ajit Meghani", date: "2020-09-03", time: "600" },
    { id: "9", value: "Live Chat", name: "Sumit Parakh", date: "2020-09-04", time: "600" },
    { id: "10", value: "Lab Reports", name: "Akshay Kawale", date: "2020-09-05", time: "600" },
    { id: "12", value: "Insurance", name: "Sanket Khilwani", date: "2020-09-01", time: "600" },
    { id: "12", value: "Home Service", name: "Harsha Labhe", date: "2020-09-02", time: "600" },
    { id: "13", value: "Customer Care", name: "Anand Garodia", date: "2020-09-02", time: "600" }
  ];

  renderArray = [
    { id: "1", value: "Loan Origination", name: "Praveer Darbeshwar", date: "2020-09-01", time: "600"},
    { id: "2", value: "Service Request", name: "Anjali Waghmare", date: "2020-09-02", time: "600" },
    { id: "3", value: "Book a Ride", name: "Shubham Bodade", date: "2020-09-03", time: "600" },
    { id: "4", value: "Appointment Booking", name: "Rahul Dahake", date: "2020-09-04", time: "600" },
    { id: "5", value: "Enquiries", name: "Tushar Narang", date: "2020-09-05", time: "600" },
    { id: "6", value: "TeleMedicine", name: "Shantanu Bahadure", date: "2020-09-01", time: "600" },
    { id: "7", value: "Doctor Request", name: "Roshan Flora", date: "2020-09-02", time: "600" },
    { id: "8", value: "Renewal", name: "Ajit Meghani", date: "2020-09-03", time: "600" },
    { id: "9", value: "Live Chat", name: "Sumit Parakh", date: "2020-09-04", time: "600" },
    { id: "10", value: "Lab Reports", name: "Akshay Kawale", date: "2020-09-05", time: "600" },
    { id: "12", value: "Insurance", name: "Sanket Khilwani", date: "2020-09-01", time: "600" },
    { id: "12", value: "Home Service", name: "Harsha Labhe", date: "2020-09-02", time: "600" },
    { id: "13", value: "Customer Care", name: "Anand Garodia", date: "2020-09-02", time: "600" }
  ];

  lenght = this.renderArray.length;

  ngOnInit() {
    this.headerForm = new FormGroup({
      department: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {

   this.renderArray = this.renderData(form);

  }

  renderData(form: any) {
    console.log('Valid?', form.valid);
    console.log(form.value.department);
    console.log(form.value.fromDate);
    console.log(form.value.toDate);

    var tempArray = [];

    this.dataArray.forEach(function (a) {

      if (a.value == form.value.department && a.date >= form.value.fromDate && a.date <= form.value.toDate) {
        tempArray.push(a);
      }

    });

    return tempArray;
  }

  resetForm() {
    this.headerForm.reset();
    this.renderArray = this.dataArray;
  }

}
