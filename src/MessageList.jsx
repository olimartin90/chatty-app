import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {
    
  render() {
    const messages = this.props.messageList.map ((message) => {
        return <Message message={message} key={message.id} />
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