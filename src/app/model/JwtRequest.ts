import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class JwtRequest {

  emailAddress: string = '';
  password: string = '';


  constructor() { }

}