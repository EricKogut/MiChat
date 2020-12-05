import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Chat } from './models/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentChat = this.socket.fromEvent<Chat>('chat');
  chats = this.socket.fromEvent<string[]>('chats');

  constructor(private socket: Socket) { }



  //Defining the event types that the server is listined for
  //currentChats and chats reprent the events emitted by the socket server
  //The client takes these as an observable


  getChat(id: string) {
    console.log("getting new chat from teh service for id", id)

    this.socket.emit('getChat', id);
  }

  newChat() {
    console.log("creating new chat from teh service")

    this.socket.emit('addChat', { id: this.chatId(), chat: '' });
  }

  editChat(chat: Chat) {
    console.log("Editing the chat from teh service and getting", chat)
    this.socket.emit('editChat', chat);
  }


  //Generates a random document id
  private chatId() {

    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    console.log("Created chat id with id",text)
    return text;
  }
}
