//== Packages
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const ENDPOINT = 'localhost:5000';
let socket;

const Chat = ({ location }) => {
  const [, setUsername] = useState('');
  const [, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Get username and room from Join component via URL 
  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    setUsername(username);
    setRoom(room);

    // For Socket.io v3:
    const connectionOptions =  {
      "force new connection" : true,
      "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
      "timeout" : 10000, //before connect_error and connect_timeout are emitted.           
      "transports" : ["websocket"]
    };
    // Set the first connection
    socket = io(ENDPOINT, connectionOptions);

    // Join chatroom
    socket.emit('join', { username, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

  }, [location.search]);

  // Receiving a new message
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('chatMessage', message, () => {
        setMessage('');
      });
    }
  }

  console.log(message, messages);

  return (
    <div className="chat__container">
      <header className="chat__header">
        <h1 className="chat__header__title">Chat</h1>
      </header>
      <form onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
};

export default Chat;
