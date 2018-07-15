import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      countUser: 0
    };
    this.socket = new WebSocket("ws://localhost:3001/websocket");
  }

  // Socket connection to server and Set time out to simulate an incoming message
  componentDidMount() {
    
    console.log("componentDidMount <App />");

    this.socket.onopen = event => {
      console.log("Connected to websocket server");
    };

    this.socket.onmessage = event => {

      const data = JSON.parse(event.data);
      switch (data.type) {
        case "incomingMessage":
          this.receiveMessage(data);
          break;
        case "incomingNotification":
          this.receiveMessage(data);
          break;
        case "incomingUserOnline":
          this.setState({countUser: data.count});
          break;
        default:
          throw new Error(`Unknown event type ${data.type}`);
      }
    };
  }

  // Receive message function and concatenate to messages array
  receiveMessage = message => {
    const messages = this.state.messages.concat(message)
    this.setState({messages: messages})
  };
  
  // Send a new message function through the web socket
  handleNewMessage = event => {
    if (event.key === "Enter") {
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
          <span className="count-user-online">{this.state.countUser} users online</span>
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} handleNewMessage={this.handleNewMessage} changeUser={this.changeUser} />
      </div>
    );
  }
}

export default App;
