import React from 'react';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="end">
      <div className="messageContainer self">
        <div>
          <p>{text}</p>
        </div>

        <div className="name">
          <p>{trimmedName}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="start">
      <div className="messageContainer other">
        <div>
          <p>{text}</p>
        </div>

        <div className="name">
          <p>{user}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
