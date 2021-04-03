//== Packages
import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [, setUsername] = useState('');
  const [, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

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
    socket.emit('join', { username, room }, ({ message }) => {
      if (message) {
        alert(message);
      }
    });

    // When unmounting component disconnect user
    return () => {
      socket.emit('disconnect');
      socket.off(); // stop the instance
    }

  }, [ENDPOINT, location.search]);

  return (
    <div className="chat__container">
      <header className="chat__header">
        <h1 className="chat__header__title">Chat</h1>
      </header>
    </div>
  )
};

export default Chat;
