//== Packages
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

//== Components
import Message from './Message';

const Messages = ({ messages, name }) => (
  <ScrollToBottom debug={false} className="chat__messages">
            {messages.map((message, index) => (
            <Message
              key={index}
              message={message}
              name={name}
            />
            ))}
  </ScrollToBottom>
);

export default Messages;
