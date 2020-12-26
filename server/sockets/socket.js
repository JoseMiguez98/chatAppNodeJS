const { io } = require('../server');
const UsersController = require('../classes/UsersController');
const { createMessage } = require('../utils/messages');

const userController = new UsersController();

io.on('connection', client => {
  console.log('User connected');

  client.on('disconnect', () => {
    console.log('Client disconnected');

    let { room, name } = userController.removeUser(client.id);

    client.broadcast.to(room).emit('message', createMessage('Admin', `${name} has left the chat room`, true));

    client.broadcast.to(room).emit('userList', userController.getUsersByRoom(room));
  });

  client.on('enterChat', ({ name, room }) => {
    userController.addUser(client.id, name, room);

    client.broadcast.to(room).emit('message', createMessage('Admin', `${ name } joined ${ room } room`, true));

    client.emit('userList', userController.getUsersByRoom(room));
    client.broadcast.to(room).emit('userList', userController.getUsersByRoom(room));

    client.join(room);
  });

  client.on('message', (message, cb) => {
    let { room, name } = userController.getByID(client.id);
    let formattedMessage = createMessage(name, message);

    client.broadcast.to(room).emit('message', formattedMessage);

    cb(formattedMessage);
  });

  client.on('privateMessage', ({ message, to }) => {
    let user = userController.getByID(client.id);
    client.broadcast.to(to).emit('privateMessage', createMessage(user.name, message));
  });
});
