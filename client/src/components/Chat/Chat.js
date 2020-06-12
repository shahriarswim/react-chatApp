import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import ChatBar from '../ChatBar/ChatBar';
import InputForm from '../InputForm/InputForm';
import Messages from '../Messages/Messages';
import Users from '../Users/Users';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');

  const ENDPOINT = 'https://react-chat-app02.herokuapp.com/';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="container">
      <div className="containerChat">
        <ChatBar room={room} />
        <Messages messages={messages} name={name} />
        <InputForm
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <Users users={users} />
    </div>
  );
};

export default Chat;
