import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  name = '';
  statementComponent: any;
  showDiv: boolean = false;
  showDiv2: boolean = false;
  fromDate: string = '';
  toDate: string = '';

  // Activated Route
  constructor(private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    console.log("Name is welcome : " + this.name);
  }

  routeIt() {
    const toDate = this.toDate;
    const fromDate = this.fromDate;
    this.router.navigate(['/statement'], { queryParams: { toDate, fromDate } });
  }
}
