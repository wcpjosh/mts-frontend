import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TransactionDto {
    
    toAccountNumber: number;
    fromAccountNumber: number;
    transactionAmount: number;
    transactionType: string;
    comments: string;

    constructor() {
        this.toAccountNumber = 0;
        this.fromAccountNumber = 0;
        this.transactionAmount = 0;
        this.transactionType='';
        this.comments = '';

    }
}