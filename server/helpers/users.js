const users = [];

//=== User joins chat ========================
const userJoin = (id, username, room) => {
  // "Beau Gosse du 93" => beaugossedu93
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Check if username already exists in the room
  const existingUser = users.find((user) => user.username === username && user.room === room);
  if (existingUser) {
    return { error: "Username is already taken"};
  }
  const user = { id, username, room};
  users.push(user);
  return { user };
};

//=== User leaves chat =======================
const userLeave = (id) => {
  // The reason we use this method is because at the end we want the function to return the removed user
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

//=== Get user ===============================
const getCurrentUser = (id) => {
  return (
    users.find((user) => user.id === id)
  );
  // Only one line: 
  // const getCurrentUser = id => users.find(user => user.id === id);
};

//=== Get users in a room ====================
const getRoomUsers = (room) => users.filter((user) => user.room === room);

module.exports = {
  userJoin,
  userLeave,
  getCurrentUser,
  getRoomUsers
};
