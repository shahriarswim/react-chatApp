import React from 'react';

import './Users.css';

const Users = ({ users }) => {
  const data = Array.from(users);
  console.log(data);

  return (
    <div className="userOnline">
      <div>
        <h1 className="userOnline__heading">Users Online: </h1>
      </div>

      <div className="userOnline__users">
        {data.map(({ name }, i) => (
          <div className="userName" key={i}>{name}</div>
        ))}
      </div>
    </div>
  );
};

export default Users;
