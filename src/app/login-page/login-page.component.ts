import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ChatAPIService} from "../chat-api.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
constructor(private pageRouter: Router,private serviceProxy: ChatAPIService) {
}

  username: string = '';
  password: string = '';

  ngOnInit() {
  }
  // authState: any;
  invalidCredentials: string = '';

  invalidChange(){
    this.invalidCredentials = '';
  }
  loginHelper(){
    console.log(this.username, this.password);

    const authState = this.serviceProxy.loginAuthentication(this.username,this.password);
    if(authState){
      this.pageRouter.navigate(['/chatbot']);
    }else{
      this.invalidCredentials = '*** INVALID CREDENTIALS ***'
    }

  };

}
