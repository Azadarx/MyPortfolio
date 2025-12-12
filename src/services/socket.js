import { io } from 'socket.io-client';

// ==================== ENVIRONMENT CONFIGURATION ====================
// Uncomment the environment you want to use

// PRODUCTION - Use this for deployed version
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// DEVELOPMENT - Use this for local development
// const SOCKET_URL = "http://localhost:5000";

// ===================================================================

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io',
    transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
    autoConnect: true, // Changed to true for immediate connection
    reconnection: true,
    reconnectionAttempts: 5, // Limited attempts to reduce console spam
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
    // Don't spam console with repeated errors
    if (socket.io.reconnecting === false) {
      console.log('Socket will retry connection...');
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
    // Only attempt manual reconnection if server initiated disconnect
    if (reason === 'io server disconnect') {
      console.log('Attempting to reconnect...');
      socket.connect();
    }
  });

  socket.on('reconnect_attempt', (attemptNumber) => {
    console.log(`Reconnection attempt ${attemptNumber}...`);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('✓ Socket reconnected after', attemptNumber, 'attempts');
  });

  socket.on('reconnect_failed', () => {
    console.error('✗ Socket reconnection failed');
  });

  // Define socket control functions
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
  // Provide dummy implementations
  socket = {
    connected: false,
    on: () => {},
    emit: () => {},
    connect: () => {},
    disconnect: () => {},
  };
  
  connectSocket = () => {
    console.warn('Socket.IO is not available');
  };
  
  disconnectSocket = () => {
    console.warn('Socket.IO is not available');
  };
}

export { socket as default, connectSocket, disconnectSocket };