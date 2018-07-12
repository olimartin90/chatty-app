// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Broadcast function to broadcast the incoming message to all connected client
wss.broadcast = (data) => {
  wss.clients.forEach(client => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const userOnline = {
  type: "incomingUserOnline",
  count: 0
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  userOnline.count ++;
  
  wss.broadcast(JSON.stringify(userOnline));

  ws.on("message", data => {

    const msg = JSON.parse(data);
    switch (msg.type) {
        case "postMessage":
          msg.id = uuidv4();
          msg.type = "incomingMessage";
          
          wss.broadcast(JSON.stringify(msg));
          break;
        case "postNotification":
          msg.id = uuidv4();
          msg.type = "incomingNotification";

          wss.broadcast(JSON.stringify(msg));
          break;
        default:
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    userOnline.count --;
    // console.log(userOnline);
    wss.broadcast(JSON.stringify(userOnline));
  })
});
