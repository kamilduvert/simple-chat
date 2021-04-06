import React from 'react';

const Header = ({ room }) => {
  return (
    <header className="chat__header">
        <h1 className="chat__header__title"><i className="fas fa-comments"></i> Room: {room}</h1>
        <a href="/"><i className="fas fa-times"></i></a>
      </header>
  )
};

export default Header;
