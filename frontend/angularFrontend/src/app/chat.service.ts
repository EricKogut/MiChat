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


  endServer() {
    this.socket.emit('endServer');
  }
  getChat(id: string) {
    console.log("getting new chat from teh service for id", id)
    this.socket.emit('getChat', id);
  }

  newChatName(input) {
    console.log("creating new chat from teh service", input)
    this.socket.emit('addChat', { id: input, chat: '' });
  }

  editChat(chat: Chat) {
    console.log("Editing the chat from teh service and getting", chat)
    this.socket.emit('editChat', chat);
  }



}
