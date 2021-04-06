//== Packages
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

//== Components
import Header from '../Header';
import Sidebar from '../Sidebar';
import Messages from '../Messages';
import Input from '../Input';

const ENDPOINT = 'localhost:5000';
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Get username and room from Join component via URL 
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);

    // For Socket.io v3:
    const connectionOptions = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
      "timeout": 10000, //before connect_error and connect_timeout are emitted.           
      "transports": ["websocket"]
    };
    // Set the first connection
    socket = io(ENDPOINT, connectionOptions);

    // Join chatroom
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        console.error(error);
      }
    });

  }, [location.search]);

  // Receiving a new message
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomUsers", ({ users }) => {
      setUsers(users);
    });
  }, [messages, users]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  }

  return (
    <div className="chat__container">
      <Header room={room} />
      <main className="chat__main">
        <Sidebar users={users} />
        <div className="chat__messages__wrapper">
          <Messages messages={messages} name={name} />
          <Input sendMessage={sendMessage} message={message} setMessage={setMessage} />
        </div>
      </main>
    </div>
  )
};

export default Chat;
