let socket = io();
let params = new URLSearchParams(window.location.search);

// listen socket events
socket.on('connect', () => {
  console.log('Connection established');

  let name = params.get('name');
  let room = params.get('room');

  if(!name || !room) {
    window.location = 'index.html';
    throw new Error('Name/Room required');
  }

  socket.emit('enterChat', { name, room });
});

socket.on('disconnect', () => console.log('Connection lost'));

socket.on('message', message => console.log(message));

socket.on('userList', data => console.log('Connected users', data));

socket.on('privateMessage', data => console.log(`Private message from ${data.name}:`, data.message));
