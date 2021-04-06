//== Packages
import React from 'react';
import dayjs from 'dayjs';
import ReactEmoji from 'react-emoji';

const Message = ({ message, name }) => {
  let isSentByUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (message.user === trimmedName) {
    isSentByUser = true;
  }

  return (
        <div className={`chat__message ${isSentByUser ? 'alignRight' : '' }`}>
          <span className={`chat__message__user ${isSentByUser ? 'colorUser' : '' }`}>{message.user}</span>
          <span className="chat__message__date">{dayjs().format('DD/MM/YYYY  h:mm A')}</span>
          <div className={`chat__message__text ${isSentByUser ? 'backgroundUser' : '' }`}>{ReactEmoji.emojify(message.text)}</div>
        </div>
      )
};

export default Message;



