import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor( private router: Router,
    private chatService: ChatService) { }
  joinRoomName;
  createRoomName;
  username;
  ngOnInit(): void {
  }

  handleUserName(term: string): void {this.username = term.replace(/[<={}()>/\\]/gi, "")}
  handleJoinRoomName(term: string): void {this.joinRoomName = term.replace(/[<={}()>/\\]/gi, "")}
  handleCreateRoomName(term: string): void {this.createRoomName = term.replace(/[<={}()>/\\]/gi, "")}

  joinRoom(){
    localStorage.setItem('name',this.joinRoomName);
    localStorage.setItem('username',this.username);
    localStorage.setItem('function',"join");
    this.router.navigate(['chat']);
  }

  createRoom(){
    localStorage.setItem('name',this.createRoomName);
    localStorage.setItem('username',this.username);
    localStorage.setItem('function',"create");
    this.router.navigate(['chat']);
  }


  killServer(){
    this.chatService.endServer();
  }
}

