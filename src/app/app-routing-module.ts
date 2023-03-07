import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { StatementComponent } from './statement/statement.component';
import { TransactionComponent } from './transaction/transaction.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    { path : '', component: LoginComponent },
    { path : 'login', component: LoginComponent },
    { path : 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService] },
    { path : 'statement', component: StatementComponent, canActivate:[RouteGuardService] },
    { path : 'statement/:type', component: StatementComponent, canActivate:[RouteGuardService] },
    { path : 'statement/#ex1-tabs-2', component: StatementComponent, canActivate:[RouteGuardService] },
    { path : 'statement/:fromDate/:toDate?', component: StatementComponent, canActivate:[RouteGuardService] },
    { path : 'transaction', component: TransactionComponent, canActivate:[RouteGuardService] },
    { path : 'logout', component: LogoutComponent, canActivate:[RouteGuardService] },
    { path : '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  