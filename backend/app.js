
//Imports for the server
var app = require('express')();
var http = require('http').createServer(app);
const express = require('express')
var io = require('socket.io')(http);
var cors = require('cors')

//Var to store that chat sessions
const chats = {};


//Import for the dotenv file
require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));

//////////////////////////////////
//use npm start to start the app//


//Defining what io can do

///EXPLANATIONS

////.on
//This is an event listener where the first param is the name of the event
//Second is the callback that is called when the function is executed  



//Connection is a reserved event type!
//We can create a callback to handle communication with one socket or used to broadcast to multiple sockets
io.on("connection", socket => {
    let previousId;

    //Handling leaving and joining rooms
    const safeJoin = currentId => {

    //Making sure you can only join one room at a time
      socket.leave(previousId);
      socket.join(currentId);

      //Now the previous id is what the currentid was
      previousId = currentId;
    };
  
    //When the client emits the getChat
    //
    socket.on("getchat", chatId => {
      safeJoin(chatId);
      socket.emit("chatument", chats[chatId]);
    });
  
    socket.on("addchat", chat => {
      chats[chat.id] = chat;
      safeJoin(chat.id);
      io.emit("chat", Object.keys(chats));
      socket.emit("chat", chat);
    });
  
    socket.on("editchat", chat => {
      chats[chat.id] = chat;
      socket.to(chat.id).emit("chatument", chat);
    });
  
    io.emit("chats", Object.keys(chats));
  });






//Routes
app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//Declaring static webpage
app.use('/', express.static('./static'));


//PORT
port = process.env.PORT || 5000; //If the port is outline in the env file use that
app.listen(port,() => console.log(`Listening on port ${port}`))
