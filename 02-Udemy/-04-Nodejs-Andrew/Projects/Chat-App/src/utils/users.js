const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate inputs
  if (!username || !room) return { error: "username and room are required!" };

  const existingUser = users.find(
    (user) => user.room === room && user.username === username
  );
  // validate same usernames in same rooms
  if (existingUser) return { error: "username is in use!" };

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
};

addUser({
  id: 45,
  username: "boli",
  room: "fgf",
});
