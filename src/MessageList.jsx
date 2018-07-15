import React from 'react';
import Message from './Message.jsx';

const MessageList = props => {
  const messages = props.messageList.map ((message) => {
    if (message.type === "incomingMessage") {
      return <Message message={message} key={message.id} />
    } else if (message.type === "incomingNotification") {
      return (
        <div className="message system" key={message.id} >
          {message.content}
        </div>
      );
    }
  });

  return (
    <main className="messages">
      {messages}
    </main>
  )
}

export default MessageList;