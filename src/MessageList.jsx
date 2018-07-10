import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {
    
  render() {
    const messages = this.props.messageList.map ((message, index) => {
        return <Message message={message} key={index} />
    });

    return (
        <main className="messages">
            {messages}
            <div className="message system">
            </div>
        </main>
    )
  }
}

export default MessageList;