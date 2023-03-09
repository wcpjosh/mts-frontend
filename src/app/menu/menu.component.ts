import { Component, OnInit } from '@angular/core';
import { AuthenticateDataService } from '../service/data/authenticate-data.service';
import { UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // isUserLoggedIn: boolean = false;
  username: string = 'arif';
  title: string = 'Money Transfer System';

  constructor(public authenticateDataService: AuthenticateDataService) {
    this.username = String();
  }
  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      const usernameFromSessionStorage = sessionStorage.getItem("username");
      this.username = usernameFromSessionStorage !== null ? usernameFromSessionStorage : "";
    }
  }

  routeOnHomeClick(){
    if (sessionStorage.getItem("username")) {
      const usernameFromSessionStorage = sessionStorage.getItem("username");
      this.username = usernameFromSessionStorage !== null ? usernameFromSessionStorage : "";
    }
  }

}
