import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, Subscription } from 'rxjs';
import { BaseResponse } from '../model/BaseResponse';
import { JwtRequest } from '../model/JwtRequest';
import { UserDto } from '../model/UserDto';
import { AuthenticateDataService } from '../service/data/authenticate-data.service';
import { UserDataService } from '../service/data/user-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {


  username: string = "";
  password: string = "";
  private getTokenSubscription: Subscription;
  private userDto: UserDto;


  invalidLogin: boolean = false;
  errorMessage: string = "Username or password is not valid, Please try again.."

  // Router instane is required to send request from login to welcome
  constructor(private router: Router,
    private authenticateDataService: AuthenticateDataService,
    private userDataService: UserDataService,
    private jwtRequest: JwtRequest) {
    this.getTokenSubscription = new Subscription();
    this.userDto = new UserDto();
  }

  ngOnDestroy(): void {
    this.getTokenSubscription.unsubscribe();
  }

  /**
   * This method is created to generate the token for the login
   */
  handleLogin() {
    this.jwtRequest.emailAddress = this.username;
    this.jwtRequest.password = this.password;
    this.getTokenSubscription = this.authenticateDataService.authenticate(this.jwtRequest).
      pipe(
        catchError(error => {
          this.invalidLogin = true;
          return of(false);
        })
      ).subscribe((result: boolean) => {
        if (result) {
          this.getUserByEmailId();
        } else {
          this.invalidLogin = true;
        }
      });
  }

  /**
   * This function is created to get the user information base oon the email address
   */
  getUserByEmailId() {
    this.userDataService.getUserByEmail().subscribe((jwtResponse: BaseResponse) => {
      this.userDto = jwtResponse.data;
      if (jwtResponse.status === 200) {
        this.userDataService.setUsername(this.userDto.username);
        this.userDataService.setLoginUser(this.userDto);
        this.router.navigate(['welcome', this.userDto.username]);
      }
      else {
        this.router.navigate(['login']);
      }
    });
  }

}
