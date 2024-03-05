import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatBotComponent} from "./chat-bot/chat-bot.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "./auth.gaurd";

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',component: LoginPageComponent
  },
      {
        path: 'chatbot', component: ChatBotComponent, canActivate: [AuthGuard]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
