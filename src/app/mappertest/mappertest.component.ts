import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../utility.service';
import { delay } from 'rxjs/operators';
import { CsvService } from './csv.service';

@Component({
  selector: 'app-mappertest',
  templateUrl: './mappertest.component.html',
  styleUrls: ['./mappertest.component.css']
})
export class MappertestComponent implements OnInit {

  tableData: any = [];
  showEditTable: boolean = false;
  editRowID: any = '';
  showRecord: any;
  isHeaderInValid = false;

  headerModel = {
    apiName: "",
    apiUrl: "",
    apiHeader: "",
    reqType: ""
  }

  constructor(private router: Router,  private utilityService: UtilityService, private csvService: CsvService) { 
    
  }

  ngOnInit() {

    this.getTableData();
    this.modifyTableData();
    this.showRecord=false;
  }

  getTableData(){
    this.tableData= [
      {id:1, abb: 'CRD'},
      {id:2, abb: 'G&L'},
      {id:3, abb: 'N&N'},
      {id:4, abb: 'M&SO'},
      {id:5, abb: 'U&A'},
      {id:6, abb: 'G&GI'},
      {id:7, abb: 'B&GC'}
    ];
    localStorage.setItem('tableData', JSON.stringify(this.tableData));
  }

  modifyTableData(){
    this.tableData = JSON.parse(localStorage.getItem('tableData'));
  }

  public saveData(){
    debugger
    console.log(this.tableData);
    localStorage.setItem('tableData', JSON.stringify(this.tableData));
    this.tableData = JSON.parse(localStorage.getItem('tableData'));

    this.router.navigate(['mappertest']);
    this.utilityService.showLoader();
    setTimeout(()=> this.utilityService.hideLoader() ,1500)
   
  }

  public clearData(){
    let todos = JSON.parse(localStorage.getItem('tableData'));

    this.tableData.forEach(function (a) {
      a['fullNameE'] = "";
      a['fullNameC'] = "";
      a['fullNameF'] = ""
    });
    localStorage.setItem('tableData', JSON.stringify(this.tableData));
    this.utilityService.showLoader();
    setTimeout(()=> this.utilityService.hideLoader() ,1500)
  }

  public download(){
    this.csvService.downloadFile(this.tableData, 'jsontocsv');
  }

  public showRecordData(){

    if(this.headerModel.apiName != "" && this.headerModel.apiUrl != "" && this.headerModel.apiHeader != "" ){
      this.showRecord = true;
      this.isHeaderInValid = false;
    }
    else{
      this.isHeaderInValid = true;
    }
    
  }

  public hideRecordData(){
    this.headerModel.apiName = null;
    this.headerModel.apiUrl = null
    this.headerModel.apiHeader = null

    this.showRecord = false;
    this.isHeaderInValid = false;
  }

}