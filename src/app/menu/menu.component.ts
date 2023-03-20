import { Component, OnInit } from '@angular/core';
import { AuthenticateDataService } from '../service/data/authenticate-data.service';
import { UserDataService } from '../service/data/user-data.service';
import { AccountService } from '../service/data/account.service';
import { BaseResponse } from '../model/BaseResponse';
import { EventLog } from '../model/EventLog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: string = 'arif';
  title: string = 'Money Transfer System';


  constructor(public authenticateDataService: AuthenticateDataService,
    public accountService: AccountService,
    private router: Router) {
  }
  
  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      const usernameFromSessionStorage = sessionStorage.getItem("username");
      this.username = usernameFromSessionStorage !== null ? usernameFromSessionStorage : "";
    }

  }

  routeOnHomeClick() {
    if (sessionStorage.getItem("username")) {
      const usernameFromSessionStorage = sessionStorage.getItem("username");
      this.username = usernameFromSessionStorage !== null ? usernameFromSessionStorage : "";
      alert(this.username);
      return this.username;
    }
    return '';
  }

}
