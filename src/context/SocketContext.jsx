import React, { createContext, useContext, useEffect, useState } from 'react';
import socket, { connectSocket, disconnectSocket } from '../services/socket.js';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [realTimeStats, setRealTimeStats] = useState({ activeUsers: 0, lastUpdate: null });

  useEffect(() => {
    connectSocket();

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join', 'analytics'); // Join analytics room
    });

    socket.on('new_visitor', (data) => {
      setRealTimeStats((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + 1,
        lastUpdate: data.timestamp
      }));
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, realTimeStats }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);