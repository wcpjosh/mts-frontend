import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { baseUrl, baseUrlTransferService } from 'src/environments/environment';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { UserDto } from 'src/app/model/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private authorizationToken = '';
  private username: string = '';
  userDTO: UserDto;

  constructor(private http: HttpClient) {
    this.userDTO = new UserDto();
  }


  getUserByEmail(): Observable<BaseResponse> {
    this.authorizationToken = 'Bearer ' + sessionStorage.getItem('authenticatedUser');
    const url = `${baseUrlTransferService}users/user?email=${sessionStorage.getItem('emailAddress')}`;
    const headers = new HttpHeaders({ 'Authorization': this.authorizationToken });
    return this.http.get<BaseResponse>(url, { headers: headers });
  }


  setUsername(name: string) {
    this.username = name;
    sessionStorage.setItem('username', this.username);
  }

  getUsername() {
    return this.username;
  }

  setLoginUser(userDTO: UserDto) {
    this.userDTO = userDTO;
  }

  getLoginUser() {
    return this.userDTO;
  }

}
