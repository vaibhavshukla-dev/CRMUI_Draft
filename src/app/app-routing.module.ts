import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ContactsComponent }   from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { AccountsComponent } from './accounts/accounts.component';
import { LoanApplicationComponent } from './loan-application/loan-application.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { ScriptDetailsComponent } from './script-details/script-details.component';
import { AuthGuard } from './auth.guard';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { CommunicateComponent } from './communicate/communicate.component';
import { CommunicateDetailsComponent } from './communicate-details/communicate-details.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { OpportunityNewComponent } from './opportunity-new/opportunity-new.component';
import { CommunicateNewComponent } from './communicate-new/communicate-new.component';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { AccountNewComponent } from './account-new/account-new.component';
import { AccountDetailsComponent } from './account-details/account-details.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'contact/:id', component: ContactDetailsComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
  { path: 'loanapplications', component: LoanApplicationComponent, canActivate: [AuthGuard] },
  { path: 'scripts', component: ScriptsComponent, canActivate: [AuthGuard] },
  { path: 'script/:id/:scriptName', component: ScriptDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:name', component: DashboardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'communicates', component: CommunicateComponent, canActivate: [AuthGuard] },
  { path: 'communicate/:id', component: CommunicateDetailsComponent, canActivate: [AuthGuard] },
  { path: 'newcontact', component: ContactNewComponent, canActivate: [AuthGuard] },
  { path: 'newopportunity', component: OpportunityNewComponent, canActivate: [AuthGuard] },
  { path: 'newcommunicate', component: CommunicateNewComponent, canActivate: [AuthGuard] },
  { path: 'opportunity/:id', component: OpportunityDetailsComponent, canActivate: [AuthGuard] },
  { path: 'newaccount', component: AccountNewComponent, canActivate: [AuthGuard] },
  { path: 'account/:id', component: AccountDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
