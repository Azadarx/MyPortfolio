// socket.js - FIXED VERSION
import { io } from 'socket.io-client';

// FIXED: Always use env variable, proper fallback
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://my-portfolio-backend-69gv.onrender.com';

console.log('🔌 Socket URL:', SOCKET_URL);

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io/',
    transports: ["websocket", "polling"], // FIXED: Try WebSocket first, fallback to polling
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10, // FIXED: More attempts
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    withCredentials: true,
    forceNew: false,
    upgrade: true,
    rememberUpgrade: true,
    secure: true, // FIXED: Force secure connection for HTTPS
    rejectUnauthorized: false // FIXED: Allow self-signed certs if needed
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
    console.log('   Transport:', socket.io.engine.transport.name);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
    console.log('   Error type:', error.type);
    console.log('   Description:', error.description);
    
    // FIXED: Better error handling
    if (error.message.includes('websocket')) {
      console.log('   WebSocket failed, will try polling...');
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('🔌 Socket disconnected:', reason);
    if (reason === 'io server disconnect') {
      // Server disconnected, manually reconnect
      console.log('   Server initiated disconnect, reconnecting...');
      socket.connect();
    } else if (reason === 'transport close') {
      console.log('   Transport closed, will auto-reconnect...');
    }
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
    console.log('   Transport:', socket.io.engine.transport.name);
  });

  socket.on('reconnect_attempt', (attemptNumber) => {
    console.log('🔄 Reconnection attempt', attemptNumber);
  });

  socket.on('reconnect_failed', () => {
    console.error('❌ Socket reconnection failed after all attempts');
    console.log('   Please check your internet connection and backend status');
  });

  socket.on('reconnect_error', (error) => {
    console.error('❌ Reconnection error:', error.message);
  });

  socket.io.engine.on('upgrade', (transport) => {
    console.log('⬆️ Socket upgraded to:', transport.name);
  });

  socket.io.engine.on('upgradeError', (error) => {
    console.error('❌ Socket upgrade error:', error.message);
  });

  // FIXED: Add ping/pong monitoring
  socket.on('ping', () => {
    console.log('🏓 Ping sent');
  });

  socket.on('pong', (latency) => {
    console.log('🏓 Pong received, latency:', latency, 'ms');
  });

  connectSocket = () => {
    if (!socket.connected) {
      console.log('🔌 Manually connecting socket...');
      socket.connect();
    } else {
      console.log('✅ Socket already connected');
    }
  };

  disconnectSocket = () => {
    if (socket.connected) {
      console.log('🔌 Manually disconnecting socket...');
      socket.disconnect();
    } else {
      console.log('ℹ️ Socket already disconnected');
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