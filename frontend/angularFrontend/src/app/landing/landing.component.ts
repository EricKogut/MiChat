import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor( private router: Router) { }
  joinRoomName;
  createRoomName;
  ngOnInit(): void {
  }


  handleJoinRoomName(term: string): void {this.joinRoomName = term.replace(/[<={}()>/\\]/gi, "")}
  handleCreateRoomName(term: string): void {this.createRoomName = term.replace(/[<={}()>/\\]/gi, "")}

  joinRoom(){
    localStorage.setItem('name',this.joinRoomName);
    localStorage.setItem('function',"join");
    this.router.navigate(['chat']);
  }

  createRoom(){
    localStorage.setItem('name',this.joinRoomName);
    localStorage.setItem('function',"create");
    this.router.navigate(['chat']);
  }

}

