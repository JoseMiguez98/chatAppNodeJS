const { io } = require('../server');
const UsersController = require('../classes/UsersController');
const { createMessage } = require('../utils/messages');

const userController = new UsersController();

io.on('connection', client => {
  console.log('User connected');

  client.on('disconnect', () => {
    console.log('Client disconnected');

    let { room, name } = userController.removeUser(client.id);

    client.broadcast.to(room).emit('message', {
      from: 'Admin',
      message: `${name} has left the chat room`,
    });

    client.broadcast.to(room).emit('userList', userController.getUsersByRoom(room));
  });

  client.on('enterChat', ({ name, room }) => {
    userController.addUser(client.id, name, room);

    client.broadcast.to(room).emit('message' ,{
      from: 'Admin',
      message: `${ name } joined ${ room } room`,
    });

    client.broadcast.to(room).emit('userList', userController.getUsersByRoom(room));

    client.join(room);
  });

  client.on('message', message => {
    let { room, name } = userController.getByID(client.id);
    client.broadcast.to(room).emit('message', createMessage(name  , message));
  });

  client.on('privateMessage', ({ message }) => {
    let user = userController.getByID(client.id);
    client.broadcast.to(client.id).emit('privateMessage', createMessage(user.name, message));
  });
});
