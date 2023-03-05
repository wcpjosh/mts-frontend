import { Component } from '@angular/core';
import { AuthenticateDataService } from '../service/data/authenticate-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {


  constructor(private authenticateDataService : AuthenticateDataService){

  }

  ngOnInit(){
    this.authenticateDataService.logout();
  }
}
