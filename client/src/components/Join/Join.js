import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="container">
      <div className="container__inner">
        <h1 className="container__heading">Join</h1>
      </div>
      <div className="container__inner">
        <input
          className="container__input"
          type="text"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="container__inner">
        <input
          className="container__input"
          type="text"
          placeholder="Room"
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      <div className="container__inner">
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="btn" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
