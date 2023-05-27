const socketio = require('socket.io');

const socketLogic = (server) => {
  const io = socketio(server);

  // Function to broadcast a message to all connected clients
  const broadcastMessage = (data) => {
    io.emit('message', data);
  };

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat events
    socket.on('chatMessage', (data) => {
      // Broadcast the received message to all connected clients
      broadcastMessage(data);
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = socketLogic;
