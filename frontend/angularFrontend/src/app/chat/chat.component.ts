import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {ChatService} from '../chat.service';
import {Subscription} from 'rxjs';
import {Chat} from '../models/chat';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit , OnDestroy {
  chat: Chat;


  messages = [];
  private _chatSub: Subscription;
  constructor(private chatService: ChatService) { }

  ngOnInit() {

     this.chat = { id: localStorage.getItem("name"), message: 'Welcome to chat room'+localStorage.getItem("name"), user:localStorage.getItem("name")}
    if(localStorage.getItem("function") == "join"){
      this.loadChat(localStorage.getItem("name"));
    }

    if(localStorage.getItem("function") == "create"){
      this.newChat(localStorage.getItem("name"));
    }

    this._chatSub = this.chatService.currentChat.pipe(
      startWith({ id: localStorage.getItem("name"), message: 'Welcome to chat room'+localStorage.getItem("name"), user:localStorage.getItem("username")})
    ).subscribe(chat =>{
      this.messages.push(chat);
      if(chat.id =="none"){
        window.alert("Chat session has been ended, goodbye.")
        setTimeout(() => { window.close();; }, 10000);

      }
      //this.chat = chat;
    } );
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }

  editChat() {
    console.log("attempting to edit the chat for within the component", this.chat)
    this.chat.user =  localStorage.getItem("username")
    this.messages.push(this.chat);
    this.chatService.editChat(this.chat);
    this.chat = {id:this.chat.id, message:"", user:localStorage.getItem("username")}
  }

  loadChat(id: string) {

    this.chatService.getChat(id);
  }

  newChat(input) {
    console.log("newChat has been triggered")
    this.chatService.newChatName(input);
  }




}
