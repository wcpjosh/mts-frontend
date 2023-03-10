import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BaseResponse } from 'src/app/model/BaseResponse';
import { catchError, Observable, throwError } from 'rxjs';
import { TransactionDto } from 'src/app/model/TransactionDto';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }


  debit(transactionDTO: TransactionDto): Observable<BaseResponse> {
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<BaseResponse>(`${baseUrl}transaction/debit`, transactionDTO, { headers });
  }

}
