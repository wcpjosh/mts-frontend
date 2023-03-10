import { Component, OnInit } from '@angular/core';
import { BaseResponse } from '../model/BaseResponse';
import { StatementService } from '../service/data/statement.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';


export class Statement {

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
    public comments: string,
    public accountNumber: number
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
  private type: string;

  private toDate: string;
  private fromDate: string;


  constructor(private statementService: StatementService,
    private route: ActivatedRoute) {
    this.type = '';
    this.toDate = '';
    this.fromDate = '';
  }


  ngOnInit(): void {
    this.getCurrentMonthTransaction();
    this.type = this.route.snapshot.params['type'];
    if (this.type === 'top10') {
      this.getTop10Transactions();
    } else if (this.type === 'curr') {
      this.getCurrentMonthTransaction();
    } else if (this.type === '1') {
      this.getLastMonthTransaction('1');
    } else if (this.type === '3') {
      this.getLastMonthTransaction('3');
    }

    this.toDate = this.route.snapshot.queryParams['toDate'];
    this.fromDate = this.route.snapshot.queryParams['fromDate']
    if (this.toDate != '' && this.fromDate != '') {
      this.getTransactionsBetweenDates(this.toDate, this.fromDate);
    }
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
   * This method is created to get the current month transaction.
   */
  getCurrentMonthTransaction() {
    this.statements = [];
    this.statementService.getMonthTransaction().subscribe((response: BaseResponse) => {
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
   * This method is created to get the last month transaction
   * @param lastM  holds the information of the last months example 1, 2, 3, 4
   */
  getLastMonthTransaction(lastM: string) {
    this.statements = [];
    this.statementService.getLastMonthTransactions(lastM).subscribe((response: BaseResponse) => {
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


  /**
   * This method is created to get the transactions between date
   * @param toDate  holds the information of the todate
   * @param fromDate  holds the information of the fromDate
   */
  getTransactionsBetweenDates(toDate: string, fromDate: string) {
    this.statements = [];
    this.statementService.getTransactionsBetweenDates(toDate, fromDate).subscribe((response: BaseResponse) => {
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
   * This method is created to genarate the PDF
   */
  generatePDF() {
    const doc = new jsPDF();
    const element = document.getElementById('statement-table');
    if (element) {
      // Convert the table to a canvas element
      html2canvas(element).then(function (canvas) {
        // Add the canvas image to the PDF
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        // Save the PDF
        doc.save('table.pdf');
      });
    } else {
      console.error('Table element not found');
    }
  }


  /**
   * This method is created to export the excel html to excel
   */
  exportToExcel(): void {
    const downloadLink = document.createElement('a');
    const dataType = 'application/vnd.ms-excel';
    const table = document.getElementById('statement-table');
    if (table != null) {
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      const headerHtml = thead ? thead.outerHTML : '';
      const rowsHtml = tbody ? tbody.outerHTML : '';
      const tableHtml = "<table>" + headerHtml + rowsHtml + "</table>";
      const fileName = 'statement.xls';
      document.body.appendChild(downloadLink);
      downloadLink.href = 'data:' + dataType + ',' + encodeURIComponent(tableHtml);
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }

}

