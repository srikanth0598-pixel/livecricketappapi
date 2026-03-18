require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { createServer } = require('http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"], // Vite dev server
      methods: ["GET", "POST"]
    }
  });

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Make io available to routes
  app.set('io', io);

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});