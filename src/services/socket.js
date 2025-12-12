// socket.js - Fixed version with proper URL handling
import { io } from 'socket.io-client';

// CRITICAL: Use the BACKEND URL, not the frontend Vercel URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://my-portfolio-backend-69gv.onrender.com';

console.log('🔌 Socket URL:', SOCKET_URL);

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io/',
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    withCredentials: true,
    forceNew: false,
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 Socket disconnected:', reason);
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ Socket reconnection failed');
  });

  connectSocket = () => {
    if (!socket.connected) {
      console.log('🔌 Manually connecting socket...');
      socket.connect();
    }
  };

  disconnectSocket = () => {
    if (socket.connected) {
      console.log('🔌 Manually disconnecting socket...');
      socket.disconnect();
    }
  };

} catch (error) {
  console.error('❌ Socket initialization error:', error);
  socket = {
    connected: false,
    on: () => {},
    emit: () => {},
    connect: () => {},
    disconnect: () => {},
  };
  
  connectSocket = () => console.warn('⚠️ Socket.IO is not available');
  disconnectSocket = () => console.warn('⚠️ Socket.IO is not available');
}

export { socket as default, connectSocket, disconnectSocket };