import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ScriptDetailsComponent } from './script-details/script-details.component';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoaderComponent } from './loader/loader.component';

import { AuthInterceptor } from './auth-interceptor';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { CommunicateComponent } from './communicate/communicate.component';
import { CommunicateDetailsComponent } from './communicate-details/communicate-details.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { OpportunityNewComponent } from './opportunity-new/opportunity-new.component';
import { CommunicateNewComponent } from './communicate-new/communicate-new.component';

import { StatesModule } from './states/states.module';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { AccountNewComponent } from './account-new/account-new.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardNewContactsComponent } from './dashboard-new-contacts/dashboard-new-contacts.component';
import { DashboardRespondedLastHourComponent } from './dashboard-responded-last-hour/dashboard-responded-last-hour.component';
import { DashboardActiveConversationsComponent } from './dashboard-active-conversations/dashboard-active-conversations.component';
import { DashboardMostTimeComponent } from './dashboard-most-time/dashboard-most-time.component';
import { DashboardActiveRequestComponent } from './dashboard-active-request/dashboard-active-request.component';
import { DashboardAllConversationComponent } from './dashboard-all-conversation/dashboard-all-conversation.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReportComponent } from './reports/report/report.component';
import { ReportHeadComponent } from './reports/report-head/report-head.component';
import { ReportDetailComponent } from './reports/report-detail/report-detail.component';
import { AcDetailsComponent } from './dashboard-all-conversation/ac-details/ac-details.component';
import { ContactDetailsNewComponent } from './contact-details-new/contact-details-new.component';
import { RelatedRequestsComponent } from './related-requests/related-requests.component';
import { InboundOutboundConversationsComponent } from './inbound-outbound-conversations/inbound-outbound-conversations.component';
import { ContactInformationComponent } from './contact-information/contact-information.component';
import {MatTabsModule} from '@angular/material/tabs';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    ContactsComponent,
    AccountsComponent,
    LoanApplicationComponent,
    ScriptsComponent,
    ContactDetailsComponent,
    ScriptDetailsComponent,
    LoginComponent,
    LoaderComponent,
    DashboardDetailsComponent,
    CommunicateComponent,
    CommunicateDetailsComponent,
    ContactNewComponent,
    OpportunityNewComponent,
    CommunicateNewComponent,
    OpportunityDetailsComponent,
    AccountNewComponent,
    AccountDetailsComponent,
    DashboardActiveConversationsComponent,
    DashboardNewContactsComponent,
    DashboardRespondedLastHourComponent,
    DashboardMostTimeComponent,
    DashboardActiveRequestComponent,
    DashboardAllConversationComponent,
    UserLoginComponent,
    ReportComponent,
    ReportHeadComponent,
    ReportDetailComponent,
    AcDetailsComponent,
    ContactDetailsNewComponent,
    RelatedRequestsComponent,
    InboundOutboundConversationsComponent,
    ContactInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StatesModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxChartsModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
