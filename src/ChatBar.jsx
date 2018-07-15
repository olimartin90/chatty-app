import React from 'react';

const ChatBar = props => {
  return (
      <footer className="chatbar">
          <input className="chatbar-username" placeholder={props.currentUser} onKeyPress={props.changeUser} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={props.handleNewMessage} />
      </footer>
  );
}

export default ChatBar;