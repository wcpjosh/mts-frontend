import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Account } from '../model/Account';
import { BaseResponse } from '../model/BaseResponse';
import { TransactionDto } from '../model/TransactionDto';
import { AccountService } from '../service/data/account.service';
import { TransactionService } from '../service/data/transaction.service';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  availableBalance: string = '';
  toDate: string = '';
  accountNumber: number = 0;
  accounts: Account[] = [];
  transactionForm: FormGroup;

  @ViewChild('fromAccount')
  fromAccount: ElementRef;

  fromAccounts: any;
  transactionDTO: TransactionDto;

  errorDiv: boolean = false;
  sucessDiv: boolean = false;
  errorMessage: string = "Transaction Failed, Please try again..!!"
  sucessMessage: string = "Transaction Successfull, Thank you..!!"


  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private transactionService: TransactionService) {

    this.transactionForm = this.formBuilder.group({
      transferTo: [''],
      amount: [''],
      remark: [''],
      transferType: [''],
    });

    this.fromAccount = new ElementRef(null);
    this.transactionDTO = new TransactionDto();

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


  onSubmit() {
    console.log(this.transactionForm.value);
    for (let i = 0; i < this.accounts.length; i++) {
      this.transactionDTO.fromAccountNumber = this.accounts[i].accountNumber;
      alert(this.transactionDTO.fromAccountNumber);
    }
    this.transactionDTO.toAccountNumber = this.transactionForm.value.transferTo;
    this.transactionDTO.transactionAmount = this.transactionForm.value.amount;
    this.transactionDTO.transactionType = this.transactionForm.value.transferType;
    this.transactionDTO.comments = this.transactionForm.value.remark;

    console.log(this.transactionDTO);
    this.doDebit(this.transactionDTO);
  }


  doDebit(transactionDto: TransactionDto) {
    this.transactionService.debit(transactionDto).subscribe((jwtResponse: BaseResponse) => {
      if (jwtResponse.status === 201) {
        this.sucessDiv = true;
        this.errorDiv = false;
      }
      else if(jwtResponse.status === 404) {
        this.sucessDiv = false;
        this.errorDiv = true;
      }
    });
  }

}
