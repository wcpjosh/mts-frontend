import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserDto {
       
     public userId : number = 0;
	 public username : string = '';
	 public password :string = '';
	 public emailAddress : string = '';
	 public phoneNumber : string = '';

}