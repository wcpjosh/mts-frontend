import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Account {
    accountId: number = 0;
    accountNumber: number = 0;
    accountType: string = '';
    availableBalance: number = 0;
    userId: number = 0;
    bankId: number = 0;

    constructor() {

    }
}