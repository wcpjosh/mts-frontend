import { Component, OnInit } from '@angular/core';
import { AuthenticateDataService } from '../service/data/authenticate-data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string = "An Error Occurred! Contact Support at ***";
  errorMsg: string = "The page you are looking for does not exist.  How you got here is a mystery. But you can click the button below to go back to the homepage."
  lostMsg: string = "UH OH! You're lost."
  errorCode: string = "404";

  username: string = "arif";

  constructor(public authenticateDataService: AuthenticateDataService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("username")) {
      const usernameFromSessionStorage = sessionStorage.getItem("username");
      this.username = usernameFromSessionStorage !== null ? usernameFromSessionStorage : "";
    }
  }

}
