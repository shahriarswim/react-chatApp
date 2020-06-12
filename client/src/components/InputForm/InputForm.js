import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './InputForm.css';

const InputForm = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="inputForm">
      <div className="inputCenter">
        <ScrollToBottom>
          <input
            className="input"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </ScrollToBottom>
      </div>
      <div className="btn-end">
        <button
          className="btn-form"
          onClick={(event) => {
            sendMessage(event);
          }}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default InputForm;
