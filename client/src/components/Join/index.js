//== Packages
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Join = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join__container">
        <h1 className="join__title">Welcome! 👋</h1>
        <form className="join__form">
          <div className="join__form__control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              id="name"
              placeholder="Enter name..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="join__form__control">
            <label htmlFor="room">Room</label>
            <select value={room} onChange={(e) => setRoom(e.target.value)} name="room" id="room">
              <option value="">--Please select a room--</option>
							<option value="JavaScript">JavaScript</option>
							<option value="Python">Python</option>
							<option value="NodeJS">NodeJs</option>
							<option value="Ruby">Ruby</option>
							<option value="Java">Java</option>
						</select>
          </div>

          {/* Prevents form to be sent incomplete / Use query string to pass info to the Chat component */}
          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button type="submit" className="btn join__form__btn">Join Chat</button>
          </Link>
        </form>
    </div>
  )
};

export default Join;
