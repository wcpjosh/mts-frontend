import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { UserDto } from 'src/app/model/UserDto';
import { baseUrl } from 'src/environments/environment';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class StatementService {
  private userDTO: UserDto;

  constructor(private http: HttpClient,
    private userDataService: UserDataService) {
    this.userDTO = new UserDto();
    console.log("from statementService component " + this.userDTO);
  }


  getTop10Transactions(): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    console.log(this.userDTO.userId);
    console.log(this.userDTO.username);
    console.log('StatementService getTop10Transactions called..');
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrl}statement/top10/` + this.userDTO.userId, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error getting transactions:', error);
        return throwError(() => new Error('test'));
      })
    );
  }



}
