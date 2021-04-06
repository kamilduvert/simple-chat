import React from 'react';

const Input = ({ sendMessage, message, setMessage }) => {
  return (
    <form className="chat__form" onSubmit={sendMessage}>
      <input className="chat__form__input" type="text" placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="chat__form__btn" type="submit"><i className="fas fa-paper-plane"></i></button>
    </form>
  )
};

export default Input;
