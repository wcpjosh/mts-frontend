import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { UserDto } from 'src/app/model/UserDto';
import { baseUrl, baseUrlStatementService } from 'src/environments/environment';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private userDTO: UserDto;

  constructor(private http: HttpClient,
    private userDataService: UserDataService) {
    this.userDTO = new UserDto();
  }


  getTop10Transactions(): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrlStatementService}statement/top10/` + this.userDTO.userId, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('test'));
      })
    );
  }


  getMonthTransaction(): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrlStatementService}statement/month/` + this.userDTO.userId + "?date=" + this.getTodaysDate(), { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('error in getMonthTransaction'));
      })
    );
  }


  getTodaysDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const dateString = `${month}-${day}-${year}`;
    return dateString;
  }


  getLastMonthTransactions(lastM: string): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrlStatementService}statement/last/` + this.userDTO.userId + "?lastMonth=" + lastM, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('error in getMonthTransaction'));
      })
    );
  }


  getTransactionsBetweenDates(toDate: string, fromDate: string): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrlStatementService}statement/between/` + this.userDTO.userId + "?toDate=" + toDate + "&fromDate=" + fromDate, { headers }).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('error in getTransactionsBetweenDates'));
      })
    );
  }

}
