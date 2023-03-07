import { Component, OnInit } from '@angular/core';
import { Account } from '../model/Account';
import { BaseResponse } from '../model/BaseResponse';
import { AccountService } from '../service/data/account.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  availableBalance: string = '8900';
  toDate: string = '';
  accountNumber: number = 0;

  accounts: Account[] = [];

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getUserAccounts();
  }

  /** 
  * This method is created to get the top 10 transation
  */
  getUserAccounts() {
    this.accountService.getAccountsByUser().subscribe((response: BaseResponse) => {
      if (response.data !== null) {
        this.accounts = response.data;
        console.log("TransactionComponenet getAccountsByUser " + response.data);
      }
      if (response.errorCode === 404) {
        console.log("404 not found");
      }
      if (response.errorCode === 401) {
        console.log("401 unauthorized token expired");
      }
    });
  }






}
