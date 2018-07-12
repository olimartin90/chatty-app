import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// Class App
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.socket = new WebSocket("ws://localhost:3001/websocket");
  }

  // Socket connection to server and Set time out to simulate an incoming message
  componentDidMount() {
    
    this.socket.onopen = event => {
      console.log("Connected to websocket server");
    };

    this.socket.onmessage = event => {
      // console.log(`event-- ${event.data}`)

      const data = JSON.parse(event.data);
      switch (data.type) {
        case "incomingMessage":
          this.receiveMessage(data);
          break;
        case "incomingNotification":
          this.receiveMessage(data);
          break;
        default:
          throw new Error(`Unknown event type ${data.type}`);
      }
    };
  
    console.log("componentDidMount <App />");

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 2000);
  }

  // Receive message function and concatenate to messages array
  receiveMessage = message => {
    const messages = this.state.messages.concat(message)
    this.setState({messages: messages})
  };
  
  // Send a new message function through the web socket
  handleNewMessage = event => {
    if (event.key == "Enter") {
      const newMessage = {
        type: "postMessage",
        username: this.state.currentUser, 
        content: event.target.value
      };
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = "";
    }
  };

  // Change user function and send incoming notification
  changeUser = event => {
    const newUsername = event.target.value;
    console.log(newUsername)
    const oldUsername = this.state.currentUser;
    if (event.key == "Enter") {
      this.setState({currentUser: newUsername});
        const message = {
          type: "postNotification",
          content: `${oldUsername} has change their name to ${newUsername}` 
        };
      this.socket.send(JSON.stringify(message));
    }
  };

  // Render function to render messages and current user
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} handleNewMessage={this.handleNewMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}

export default App;
