import React from 'react';

const Sidebar = ({ users }) => {
  return (
    <div className="chat__sidebar">
    <h3><i className="fas fa-users"></i> Users</h3>
    <div className="chat__sidebar__users">
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul> 
    </div>
  </div>
  )
};

export default Sidebar;
