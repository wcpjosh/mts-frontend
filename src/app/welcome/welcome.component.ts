import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from '../model/UserDto';
import { UserDataService } from '../service/data/user-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  
  name = '';

  // Activated Route
  constructor(private route: ActivatedRoute,
    private userDataService: UserDataService) {
    // this.name = userDataService.getUserByEmail
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }

  // ngOnInit() {
  //   this.userDataService.getUserByEmail().subscribe(userDto => {
  //     this.userDto = userDto;
  //     this.name = userDto.username;
  //     console.log('from ngOn init User retrieved:', this.userDto);
  //   });
  // }

}
