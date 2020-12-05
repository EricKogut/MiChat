import { Component, OnInit, OnDestroy } from '@angular/core';
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
    console.log("")
    this._chatSub = this.chatService.currentChat.pipe(
      startWith({ id: '', message: 'Select an existing document or create a new one to get started'})
    ).subscribe(chat => this.chat = chat);
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }

  editChat() {
    this.chatService.editChat(this.chat);
  }
}
