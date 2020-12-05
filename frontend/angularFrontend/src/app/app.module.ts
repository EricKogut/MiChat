import { BrowserModule } from '@angular/platform-browser';
import {environment} from "../../environment"
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.socket_url, options: {} };

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    //Sending connection to socket server as soon as the file is loaded
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
