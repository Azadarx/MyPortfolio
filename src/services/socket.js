// socket.js - FIXED VERSION with proper configuration
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://my-portfolio-backend-69gv.onrender.com';

console.log('🔌 Socket URL:', SOCKET_URL);

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io/',
    transports: ["polling", "websocket"], // Start with polling, upgrade to websocket
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    withCredentials: true, // Important for CORS
    forceNew: false,
    upgrade: true, // Allow transport upgrade
    rememberUpgrade: true
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
    console.log('   Transport:', socket.io.engine.transport.name);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
    console.log('   Falling back to polling...');
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 Socket disconnected:', reason);
    if (reason === 'io server disconnect') {
      // Server disconnected, manually reconnect
      socket.connect();
    }
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ Socket reconnection failed after all attempts');
  });

  socket.io.engine.on('upgrade', (transport) => {
    console.log('⬆️ Socket upgraded to:', transport.name);
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
  
  // Fallback mock socket
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