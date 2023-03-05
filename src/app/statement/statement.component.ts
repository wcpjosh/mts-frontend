import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../model/BaseResponse';
import { StatementService } from '../service/data/statement.service';
import { jsPDF } from 'jspdf';


export class Statement {
  /* 
   private transactionId : number = 0;
   private transactionType : string = '';
   private transferType : string = '';
   private transactionAmount: number = 0.0;
   private openingBalance : number = 0.0;
   private closingBalance : number = 0.0;
   private transactionDate: string = '';
   private transactionTimestamp :string= '';
   private accountId: number = 0;
   private userId: number = 0;
   private comments: string = '';*/

  constructor(
    public transactionId: number,
    public transactionType: string,
    public transferType: string,
    public transactionAmount: number,
    public openingBalance: number,
    public closingBalance: number,
    public transactionDate: string,
    public transactionTimestamp: string,
    public accountId: number,
    public userId: number,
    public comments: string
  ) {

  }
}

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit {

  statements: any[] = [];
  // [
  //   // new Statement(7, "IMPS", "DEBIT", 200.0, 1500.0, 1300.0, "2023-02-23", "2023-02-23T03:58:41.355+00:00", 17, 1, "Send 390 Again"),
  //   // new Statement(5, "IMPS", "DEBIT", 390.0, 1000.0, 610.0, "2023-02-21", "2023-02-21T17:32:45.203+00:00", 19, 1, "Send 390 Again"),
  //   // new Statement(4, "NEFT", "CREDIT", 300.0, 1200.0, 1500.0, "2023-02-21", "2023-02-21T08:01:42.973+00:00", 17, 1, "Send 300 Again"),
  //   // new Statement(2, "IMPS", "CREDIT", 200.0, 1000.0, 1200.0, "2023-02-21", "2023-02-21T07:58:55.024+00:00", 17, 1, "Send 200")
  // ];



  baseResponse: BaseResponse;

  constructor(private statementService: StatementService) {
    this.baseResponse = new BaseResponse();
  }


  ngOnInit(): void {
    this.statementService.getTop10Transactions().subscribe((response: BaseResponse) => {
      if (response.data !== null) {
        this.statements = response.data;
        console.log("statement component ts ngOnInit " + response.data);
      }
      if (response.errorCode === 404) {
        console.log("404 not found");
      }
      if (response.errorCode === 401) {
        console.log("401 unauthorized token expired");
      }

    });
  }

  makePDF(){
    
      
  }

}

