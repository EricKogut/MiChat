
//Imports for the server
var app = require('express')();
var http = require('http').createServer(app);
const express = require('express')
var io = require('socket.io')(http,  {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      credentials: true
    }
  },
  {'transports': ['websocket', 'polling']});
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
    console.log("new connection detected from socket", socket.id)
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
    //Joins the chatroom with a given id and returns the chat to the initiating clietn
    socket.on("getChat", chatId => {
      //
    console.log("getting the chat with id", chatId)
    console.log(chats, "are the current chats")
     //Joining the chat room with a given if    
      safeJoin(chatId); 


      //Returning the chat to the starting client 
      console.log("emitting", chats[chatId])
      socket.emit("chat", chats[chatId]);
    });
  

    //When we recieve a chat
    //The socket joins the room of a given id is broadcasted to anyone in the same room
    socket.on("addChat", chat => {
      console.log("adding chat", chat)
      
      chats[chat.id] = chat;
      safeJoin(chat.id);
      //Letting everyone know that is connected to the socket that there is a new chat
      
      //Sending the chat to everyone
      io.emit("chat", Object.keys(chats));

      //Sending the chat to the client
      socket.emit("chat", chat);
    });
  

    //Anytime a client enters information the chat will update the chats document
    socket.on("editChat", chat => {
      console.log("editing chat", chat)

      chats[chat.id] = chat;

      //Sending the updated chat to the clients that are in a given room
      socket.to(chat.id).emit("chat", chat);
    });
  
    io.emit("chats", Object.keys(chats));
  });

  http.listen(process.env.SOCKET_PORT);





//Routes
app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//Declaring static webpage
app.use('/', express.static('./static'));


//PORT
// port = process.env.PORT || 5002; //If the port is outline in the env file use that
// app.listen(port,() => console.log(`Listening on port ${port}`))
