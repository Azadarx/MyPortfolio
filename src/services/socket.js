// socket.js - Fixed version
import { io } from 'socket.io-client';

// Use environment variable
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://my-portfolio-backend-69gv.onrender.com';

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io/',  // Match server path exactly
    transports: ['polling', 'websocket'], // Start with polling for better compatibility
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    timeout: 20000,
    withCredentials: true,
    forceNew: false,
    multiplex: true,
  });

  socket.on('connect', () => {
    console.log('✓ Socket connected:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('✗ Socket connection error:', error.message);
    // Less verbose logging
    if (!socket.io.reconnecting) {
      console.log('Socket will retry connection...');
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  socket.on('reconnect_attempt', (attemptNumber) => {
    if (attemptNumber === 1) {
      console.log('Attempting to reconnect...');
    }
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('✓ Socket reconnected after', attemptNumber, 'attempts');
  });

  socket.on('reconnect_failed', () => {
    console.error('✗ Socket reconnection failed after max attempts');
  });

  connectSocket = () => {
    if (!socket.connected) {
      console.log('Manually connecting socket...');
      socket.connect();
    }
  };

  disconnectSocket = () => {
    if (socket.connected) {
      console.log('Manually disconnecting socket...');
      socket.disconnect();
    }
  };

} catch (error) {
  console.error('Socket initialization error:', error);
  socket = {
    connected: false,
    on: () => {},
    emit: () => {},
    connect: () => {},
    disconnect: () => {},
  };
  
  connectSocket = () => console.warn('Socket.IO is not available');
  disconnectSocket = () => console.warn('Socket.IO is not available');
}

export { socket as default, connectSocket, disconnectSocket };