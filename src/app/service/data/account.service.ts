import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from 'src/app/model/Account';
import { UserDataService } from './user-data.service';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { UserDto } from 'src/app/model/UserDto';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountDTO: Account[] = [];
  private userDTO: UserDto;

  constructor(private http: HttpClient,
    private userDataService: UserDataService) {
    this.userDTO = new UserDto();
  }

  getAccountsByUser(): Observable<BaseResponse> {
    this.userDTO = this.userDataService.getLoginUser();
    console.log(this.userDTO.userId);
    console.log(this.userDTO.username);
    console.log('AccountService getAccountsByUser called..');
    const token = sessionStorage.getItem('authenticatedUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<BaseResponse>(`${baseUrl}accounts/user/` + this.userDTO.userId, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error getting accounts:', error);
        return throwError(() => new Error('account error'));
      })
    );
  }

}


