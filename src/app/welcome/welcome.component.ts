import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResponse } from '../model/BaseResponse';
import { AccountService } from '../service/data/account.service';
import { StatementService } from '../service/data/statement.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  name = '';
  statementComponent: any;
  showDiv: boolean = false;
  showDiv2: boolean = false;
  showTranc: boolean = true;
  fromDate: string = '';
  toDate: string = '';
  lastActivityDate = '2022-02-22T14:05:33.594+00:00';

  statements: any[];

  // Activated Route
  constructor(private route: ActivatedRoute,
    private router: Router,
    private statementService: StatementService,
    private accoutService: AccountService) {
    this.statements = [];
    this.getTop10Transactions();
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    if (sessionStorage.getItem("username")) {
      const usernameFromSessionStorage = sessionStorage.getItem("username");
      this.name = usernameFromSessionStorage !== null ? usernameFromSessionStorage : "";
    }
    this.getLastLoginActvity();
  }

  routeIt() {
    const toDate = this.toDate;
    const fromDate = this.fromDate;
    this.router.navigate(['/statement'], { queryParams: { toDate, fromDate } });
  }

  lastToggleDivAndTranc() {
    this.showDiv = !this.showDiv;
    this.showTranc = !this.showTranc;
  }


  betweenToggleDivAndTranc() {
    this.showDiv2 = !this.showDiv2;
    this.showTranc = !this.showTranc;
  }


  /**
  * This method is created to get the top 10 transation
  */
  getTop10Transactions() {
    this.statementService.getTop10Transactions().subscribe((response: BaseResponse) => {
      if (response.data !== null) {
        this.statements = response.data;
      }
      if (response.errorCode === 404) {
        console.log("404 not found");
      }
      if (response.errorCode === 401) {
        console.log("401 unauthorized token expired");
      }
    });
  }



  /**
* This method is created to last LoginActivity
*/
  getLastLoginActvity() {
    this.accoutService.lastLoginActivty().subscribe((response: BaseResponse) => {
      this.lastActivityDate = response.data.activityTimeStamp;
    });
  }
}

