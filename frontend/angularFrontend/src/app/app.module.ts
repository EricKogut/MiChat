import { BrowserModule } from '@angular/platform-browser';
import {environment} from "../../environment"
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.socket_url, options: {} };

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { LandingComponent } from './landing/landing.component';

const myRoutes: Routes =  [
  { path: '', component: LandingComponent },
  { path: 'chat', component: ChatComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatComponent,
    HelloWorldComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    //Sending connection to socket server as soon as the file is loaded
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(myRoutes, {useHash:true}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
