import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    console.log("is user login ", this.isUserLoggedIn());
    if (username != "khanrf" || password != "password") {
      return false;
    }
    sessionStorage.setItem('authenticatedUser', username);
    console.log("is user login ", this.isUserLoggedIn());
    return true;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    if (user == null)
      return false;
    return true;
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }

}
