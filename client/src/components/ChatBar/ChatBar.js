import React from 'react';

import './ChatBar.css';

const ChatBar = ({ room }) => {
  return (
    <div className="chatBar">
      <div>
        <p>Online</p>
      </div>
      <div>
        <h3>{room}</h3>
      </div>
      <div>
        <a className="chatBar__link" href="/">Leave</a>
      </div>
    </div>
  );
};

export default ChatBar;
