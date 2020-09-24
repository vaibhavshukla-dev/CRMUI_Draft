import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  apiBase: string = "https://whatsappcrm.herokuapp.com"; apiBase: string = "https://healthcarecrm.herokuapp.com";
apiBase: string = "https://healthcarecrm.herokuapp.com";

  constructor( private httpClient: HttpClient) { }

  public authenticateUser(username: string, password: string){
    return this.httpClient.post(`${this.apiBase}/api/loginAuth`, {username:username, pass:password});
  }

  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('loggedinuser');    
  }

  public isLoggedIn(){
    return !!localStorage.getItem('access_token');
  }

  public getContacts() {    
    return this.httpClient.get(`${this.apiBase}/api/contacts`);
  }

  public getAccounts() {
    return this.httpClient.get(`${this.apiBase}/api/accounts`);
  }

  public getAccount(id: string){
    return this.httpClient.get(`${this.apiBase}/api/account/${id}`);
  }

  public getAccountContacts(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getAccountContacts/${id}`);
  }

  public getAccountOpportunities(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getAccountOpportunities/${id}`);
  }

  public getContact(id: string){
    return this.httpClient.get(`${this.apiBase}/api/contact/${id}`);
  }

  public getContactConversation(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getcontactconversation/${id}`);
  }

  public getHomeCount(){
    return this.httpClient.get(`${this.apiBase}/api/getHomeCounts`);
  }

  public getConversations(){
    return this.httpClient.get(`${this.apiBase}/api/maxResponseTimeTookByConversation`);
  }

  public getScripts(){
    return this.httpClient.get(`${this.apiBase}/api/scripts`);
  }

  public getContactLoanApplications(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getContactLoanApplications/${id}`);
  }

  public getHealthRequests(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getHealthcareRequests/${id}`);
  }

  public getcontactDocuments(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getcontactDocuments/${id}`);
  }

  public getcontactDoctorDocs(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getcontactDoctorDocs/${id}`);
  }

  public getScriptDetails(id: string){
    return this.httpClient.get(`${this.apiBase}/api/script/${id}`);
  }

  public newContactsOfWeek(){
    return this.httpClient.get(`${this.apiBase}/api/newContactsOfWeek`);
  }

  public currentActiveContacts(){
    return this.httpClient.get(`${this.apiBase}/api/currentActiveContacts`);
  }
  
  public processwiseContacts(){
    return this.httpClient.get(`${this.apiBase}/api/processwiseContacts`);
  }

  public recentActiveContacts(){
    return this.httpClient.get(`${this.apiBase}/api/recentActiveContacts`);
  }

  public getLoanapplications(){
    return this.httpClient.get(`${this.apiBase}/api/loanApplications`);
  }

  public getOpportunityDetails(id: string){
    return this.httpClient.get(`${this.apiBase}/api/opportunity/${id}`);
  }

  public getOpportunityContacts(id: string){
    return this.httpClient.get(`${this.apiBase}/api/opportunityContacts/${id}`);
  }
  
  public getCommunicates(){
    return this.httpClient.get(`${this.apiBase}/api/communicates`);
  }

  public getCommunicate(id: string){
    return this.httpClient.get(`${this.apiBase}/api/communicate/${id}`);
  }

  public getCommunicateContacts(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getCommunicateContacts/${id}`);
  }

  public getContactCommunicates(id: string){
    return this.httpClient.get(`${this.apiBase}/api/getContactCommunicates/${id}`);
  }

  public getProcessWithStartStage(){
    return this.httpClient.get(`${this.apiBase}/api/getProcessWithStartStage`);
  }

  public saveContact(contactObj){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/contact/new`, contactObj, httpOptions);
  }
  
  public saveAccount(accountObj){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/account/new`, accountObj, httpOptions);
  }

  public isMobileSavable(contactDetails){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/contact/exists`, contactDetails, httpOptions);
  }

  public updateContact(contactDetails){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/contact/update`, contactDetails, httpOptions);
  }

  public updateAccount(accountDetails){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/account/update`, accountDetails, httpOptions);
  }

  public sendMessage(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/twilio/sendMessage`, data, httpOptions);
  }

  public initiateTemplateScriptForContact(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/initiateTemplateScriptForContact`, data, httpOptions);
  }

  public saveOpportunity(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/opportunity/new`, data, httpOptions);
  }

  public updateOpportunity(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post(`${this.apiBase}/api/opportunity/update`, data, httpOptions);
  }

}
