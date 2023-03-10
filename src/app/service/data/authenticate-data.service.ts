import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { JwtRequest } from 'src/app/model/JwtRequest';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { baseUrl } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateDataService {

  constructor(
    private http: HttpClient,
    private jwtResponse: BaseResponse,
  ) {

  }

  getToken(jwtRequest: JwtRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${baseUrl}authenticate`, jwtRequest).pipe(
      map((response: any) => {
        const jwtResponse = new BaseResponse();
        jwtResponse.data = response.data;
        jwtResponse.errorCode = response.errorCode;
        jwtResponse.errorMessage = response.errorMessage;
        jwtResponse.message = response.message;
        jwtResponse.status = response.status;
        this.jwtResponse = jwtResponse;
        if (response.status === 200) {
          sessionStorage.setItem('authenticatedUser', jwtResponse.data.token);
          sessionStorage.setItem('emailAddress', jwtResponse.data.emailAddress);
        } else {
          this.removeSessionStorage();
        }
        return jwtResponse;
      }),
      catchError(error => {
        this.removeSessionStorage();
        return throwError(() => error);
      })
    );
  }

  public getJwtResponse(requestBody: JwtRequest): Observable<BaseResponse> {
    return this.getToken(requestBody);
  }

  authenticate(jwtRequest: JwtRequest): Observable<boolean> {
    return this.getToken(jwtRequest).pipe(
      map((jwtResponse: any) => {
        if (jwtResponse.data != null && jwtResponse.status === 200) {
          sessionStorage.setItem('authenticatedUser', jwtResponse.data.token);
          sessionStorage.setItem('emailAddress', jwtResponse.data.emailAddress);
          return true;
        } else if (jwtResponse.status === 401) {
          this.removeSessionStorage();
          return false;
        } else {
          console.log("Unexpected error");
          this.removeSessionStorage();
          return false;
        }
      })
    );
  }


  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user == null)
      return false;
    return true;
  }

  logout() {
    this.removeSessionStorage();
    this.jwtResponse == null;
  }


  removeSessionStorage() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('emailAddress');
    sessionStorage.removeItem('username');
  }
}
