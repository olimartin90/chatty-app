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
    
    this.socket.addEventListener("open", e => {
      console.log("Connected to websocket server");
    });

    this.socket.addEventListener("message", this.receiveMessage);
  
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  // Receive message function and concatenate to messages array
  receiveMessage = e => {
    const newMessage = JSON.parse(e.data)
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  };
  
  // Send a new message function through the web socket
  handleNewMessage = e => {
    if (e.key == "Enter") {
      const newMessage = {
        username: this.state.currentUser, 
        content: e.target.value,
        type: "message"
      };
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  };

  // Change user function
  changeUser = e => {
    if (e.key == "Enter") {
      const userName = e.target.value
      this.setState({currentUser: userName})
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
