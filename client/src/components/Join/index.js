import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Join = () => {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join__container">
      <header className="join__header">
        <h1 className="join__header__title">Join</h1>
      </header>
      <main className="join__main">
        <form className="join__form">
          <div className="join__form__control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              id="username"
              placeholder="Enter username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="join__form__control">
            <label htmlFor="room">Room</label>
            <select value={room} onChange={(e) => setRoom(e.target.value)} name="room" id="room">
              <option value="">--Please select a room--</option>
							<option value="JavaScript">JavaScript</option>
							<option value="Python">Python</option>
							<option value="NodeJS">PHP</option>
							<option value="Ruby">Ruby</option>
							<option value="Java">Java</option>
						</select>
          </div>

          {/* Prevents form to be sent incomplete / Use query string to pass info to the Chat component */}
          <Link onClick={e => (!username || !room) ? e.preventDefault() : null} to={`/chat?name=${username}&room=${room}`}>
            <button type="submit" className="btn">Join Chat</button>
          </Link>
        </form>
      </main>
    </div>
  )
};

export default Join;
