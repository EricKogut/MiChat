# MiChat
>
> ![](images/logo.png)

MiChat is built using Angular to handle frontend input from the client side while the backend is handled with Node.js and Express. In order to connect users together, our application used socket.io to create an event-driven backend server which responds to server requests as they are sent. To link the frontend with the backend, a number of services were created on the Angular side to handle the http communication.


#### Server

The underlying communication is abstracted from the user via the socket.io API, which operates both on the server and client side. The socket.io library also works to create “rooms” which the connected sockets join and exit. To facilitate the server to run, Node.js is used to run the javascript while express is used as middleware to make the routing to the endpoints from the client much more easier on the user. Finally, the server is running on a Linux AMI instance utilizing EC2 on AWS. 

#### Client
The client is run using Angular and is responsible for handling the user input for the room names, username in addition to the message input.  The main pages involved here are the landing page (where the user joins/creates a chatroom) and the messaging page where the user enters a chatroom and utilizes the chat component to send messages to the server. The Angular client also provides the frontend with functionality to the components with an accompanying typescript file which loads the data with the chat service. 



The chat service is the middle man in the communication between the backend and frontend and stores all the endpoints to the backend server. Once a call is made to the service it returns an Observable and the client continues to listen to it to update the messages in the chat room. The subject of the objects from the observables “observe”  any state changes to make sure that any changes to the state are tracked, and automatically updated on the frontend. The chat.component.ts file subscribes to the observables, handling any changes made from the client, or another client, and updating the list of messages accordingly. In this, the typescript file of the chat acts as a consumer and a producer as it listens to the changes by subscribing in addition to sending out new messages to the service, which is forwarded to the server.






##### First chat app is now
- [ ] Started
- [ ] In progress
- [x] Complete

[Additional Documentation found here :)](https://docs.google.com/document/d/140QsyKwDcQ2Hb_sxLpszucbrhoh_L8X_K1EIkFZtuFM/edit?usp=sharing)






