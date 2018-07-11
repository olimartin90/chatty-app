import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Oli"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.socket = new WebSocket("ws://localhost:3001/websocket");
  }

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

  receiveMessage = e => {
    const newMessage = JSON.parse(e.data)
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  };
  
  handleNewMessage = e => {
    if (e.key == "Enter") {
      const newMessage = {
        username: this.state.currentUser.name, 
        content: e.target.value,
        type: "message"
      };
      this.socket.send(JSON.stringify(newMessage));
      e.target.value = "";
    }
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageList={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} handleNewMessage={this.handleNewMessage} />
      </div>
    );
  }
}

export default App;
