import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit, OnDestroy {

  //Stream of chats
  chats: Observable<string[]>;
  currentChat: string;

  //Reference to the subscription that gets the curren selected doc
  private _chatSub: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chats = this.chatService.chats;
    console.log(this.chats, "are the ccurrent chats")
    //Getting the chat changes su
    this._chatSub = this.chatService.currentChat.subscribe(chat =>{
      console.log("chat", chat, "returned from the service")
      this.currentChat = chat.id
    } );
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }


  //NOTE
  //The two methods below don't return or assign anything, they ONLY fire off events ot the socket server which fires of an event back to the observable

  loadChat(id: string) {
    this.chatService.getChat(id);
  }

  newChat() {
    console.log("newChat has been triggered")
    this.chatService.newChat();
  }

}
