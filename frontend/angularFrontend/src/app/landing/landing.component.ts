import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }
  joinRoomName;
  createRoomName;
  ngOnInit(): void {
  }


  handleJoinRoomName(term: string): void {this.joinRoomName = term.replace(/[<={}()>/\\]/gi, "")}
  handleCreateRoomName(term: string): void {this.createRoomName = term.replace(/[<={}()>/\\]/gi, "")}

}

