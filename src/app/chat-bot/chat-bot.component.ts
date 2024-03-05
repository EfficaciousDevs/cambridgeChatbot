import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgxSpinnerService} from "ngx-spinner";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {ChatAPIService} from "../chat-api.service";
import {Router} from "@angular/router";

interface MessageList {
  user: string;
  bot: string;
}
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss',
  animations: [
    trigger('messageState', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1,
      })),
      transition('void => *', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
        animate('300ms ease-out'),
      ]),
      transition('* => void', [
        animate('300ms ease-in', style({
          transform: 'translateX(100%)',
          opacity: 0,
        })),
      ]),
    ]),
  ],
})
export class ChatBotComponent implements OnInit{

  messageList: MessageList[] = [{user:'Hey',bot: ''}];
  userInput: string = '';
  isDisabled: boolean = false;
  audioFile: HTMLAudioElement = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  constructor(private http: HttpClient, private spinner:NgxSpinnerService, protected authenticationService: ChatAPIService,private router: Router) {}

  ngOnInit() {
    this.spinner.show();
    // this.sendMessages();

    const chatRequest =
      {
        "query": this.messageList[this.messageList.length - 1].user,
        "flag_": this.flagKey,
        "predClass": this.predClass,
        "responseFlag": this.responseFlag,
        "q1sales": this.q1Sales,
        "contact": this.contactNo,
        "name": this.userName,
        "q1personal": this.q1Personal
      }

    this.http.post('http://52.172.252.7:5010/chat', chatRequest)
      .subscribe((chatResponse: any) => {
        this.messageList.push({user: '', bot: chatResponse?.response});
        this.audioFile.play();
        this.predClass = chatResponse.predClass;
        this.flagKey = chatResponse.flag_;
        this.responseFlag = chatResponse.responseFlag;
      });


    setTimeout(()=>{
      this.spinner.hide();
    },1000)

    const sideBar: HTMLElement = document.querySelector('.sidebar') as HTMLElement;

    if (sideBar.classList.contains('close')) {
      sideBar.classList.remove('close');
    } else {
      sideBar.classList.toggle('close');
    }
  }

  q1Sales: string = '';
  q1Personal: string = '';
  predClass: string = '';
  flagKey: string = '';
  contactNo: number = 0;
  userName: string = '';
  responseFlag: boolean = false;
  // questionFlag: string = '';
  // responseData: any;

  sendMessages() {
    if (this.userInput) {
      this.isDisabled = true;
      this.messageList.push({user: this.userInput, bot: ''});
      this.userInput = '';

      if (this.predClass.length < 1 && (this.q1Personal.length < 1 || this.q1Sales.length < 1)) {
          const chatRequest =
            {
              "query": this.messageList[this.messageList.length - 1].user,
              "flag_": this.flagKey,
              "predClass": this.predClass,
              "responseFlag": this.responseFlag,
              "q1sales": this.q1Sales,
              "contact": this.contactNo,
              "name": this.userName,
              "q1personal": this.q1Personal
              // "questionFlag": this.questionFlag
            }

          this.http.post('http://52.172.252.7:5010/chat', chatRequest)
            .subscribe((chatResponse: any) => {
              this.messageList.push({user: '', bot: chatResponse?.response});
              this.audioFile.play();
              this.predClass = chatResponse.predClass;
              this.flagKey = chatResponse.flag_;
              this.responseFlag = chatResponse.responseFlag;
              this.isDisabled = false;
              // this.responseData = chatResponse;
            });
        } else {
          if (this.predClass == 'sales lead') {
            this.q1Sales = this.messageList[2]?.user;
          } else if (this.predClass == 'personal') {
            this.q1Personal = this.messageList[2]?.user;
          }

          // if(this.responseData.flag_.length < 1){
          //   this.questionFlag = this.messageList[this.messageList.length - 1]?.user;
          // }

          const chatRequest =
            {
              "query": this.messageList[this.messageList.length - 1].user,
              "flag_": this.flagKey,
              "predClass": this.predClass,
              "responseFlag": this.responseFlag,
              "q1sales": this.q1Sales,
              "contact": this.contactNo,
              "name": this.userName,
              "q1personal": this.q1Personal
              // "questionFlag": this.questionFlag
            }


          this.http.post('http://52.172.252.7:5010/chat', chatRequest)
            .subscribe((chatResponse: any) => {
              this.audioFile.play();
              this.messageList.push({user: '', bot: chatResponse?.response});
              this.predClass = chatResponse?.predClass;
              this.flagKey = chatResponse?.flag_;
              this.contactNo = chatResponse?.contact;
              this.userName = chatResponse?.name;
              this.responseFlag = chatResponse.responseFlag;
              this.isDisabled = false;
            });
        }
      }
    }


  isLoggedOut(){
    this.router.navigate(['/login']);
  }
  }
