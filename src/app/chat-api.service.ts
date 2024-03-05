import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatAPIService {

  constructor() { }

  userName: string = '';
  password: string = '';
  authorizationStatus: boolean = false;


  loginAuthentication(userName: string,userPassword: string): boolean{
    this.userName = userName;
    this.password = userPassword;


    if(this.userName === 'huseinVohra' && this.password === 'husein@vohra'){
      this.authorizationStatus = true;
      return this.authorizationStatus;
    }
    else{
      this.authorizationStatus = false;
      return this.authorizationStatus;
    }
  }

}


