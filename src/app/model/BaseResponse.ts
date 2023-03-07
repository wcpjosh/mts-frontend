import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class BaseResponse {

    data: any;
    errorCode: number = 0;
    errorMessage: string = '';
    message: string = '';
    status: number = 0;


    constructor() { }

}