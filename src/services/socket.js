// socket.js - COMPLETELY FIXED VERSION
import { io } from 'socket.io-client';

// CRITICAL FIX: Use backend URL, not frontend URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://my-portfolio-backend-69gv.onrender.com';

console.log('🔌 Socket URL:', SOCKET_URL);

// Verify we're not using the frontend URL
if (SOCKET_URL.includes('vercel.app')) {
  console.error('❌ ERROR: Socket URL is pointing to frontend! Check your .env file');
}

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io/',
    transports: ["polling", "websocket"], // FIXED: Start with polling for Render
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    reconnectionDelayMax: 10000,
    timeout: 20000,
    withCredentials: true,
    upgrade: true,
    rememberUpgrade: true,
    secure: true,
    rejectUnauthorized: false
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
    console.log('   Transport:', socket.io.engine.transport.name);
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
    connect: () => console.warn('⚠️ Socket not available'),
    disconnect: () => {},
    io: { engine: { transport: { name: 'none' } } }
  };
  
  connectSocket = () => console.warn('⚠️ Socket.IO is not available');
  disconnectSocket = () => console.warn('⚠️ Socket.IO is not available');
}

export { socket as default, connectSocket, disconnectSocket };