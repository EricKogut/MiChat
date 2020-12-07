const io = require('socket.io-client');
const socket = io.connect(process.env.SOCKET_PORT); // Specify port if your express server is not using default port 80

socket.on('connect', () => {
  socket.emit('npmStop');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});