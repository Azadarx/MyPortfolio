import { io } from 'socket.io-client';

// ==================== ENVIRONMENT CONFIGURATION ====================
// Uncomment the environment you want to use

// PRODUCTION - Use this for deployed version
const SOCKET_URL = "https://my-portfolio-backend-69gv.onrender.com";

// DEVELOPMENT - Use this for local development
// const SOCKET_URL = "http://localhost:5000";

// ===================================================================

let socket;
let connectSocket;
let disconnectSocket;

try {
  socket = io(SOCKET_URL, {
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    autoConnect: false, // Don't connect automatically
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
    // Attempt to reconnect if disconnected
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  // Define socket control functions
  connectSocket = () => {
    if (!socket.connected) {
      socket.connect();
    }
  };

  disconnectSocket = () => {
    if (socket.connected) {
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