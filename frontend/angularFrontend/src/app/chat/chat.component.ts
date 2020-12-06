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
  private _chatSub: Subscription;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    if(localStorage.getItem("function") == "join"){
      this.loadChat(localStorage.getItem("name"));
    }

    if(localStorage.getItem("function") == "create"){
      this.newChat(localStorage.getItem("name"));
    }

    this._chatSub = this.chatService.currentChat.pipe(
      startWith({ id: localStorage.getItem("name"), message: 'Select an existing document or create a new one to get started'})
    ).subscribe(chat => this.chat = chat);
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }

  editChat() {
    console.log("attempting to edit the chat for within the component", this.chat)
    this.chatService.editChat(this.chat);
  }

  loadChat(id: string) {
    this.chatService.getChat(id);
  }

  newChat(input) {
    console.log("newChat has been triggered")
    this.chatService.newChatName(input);
  }




}
