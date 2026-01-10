import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { authService } from '../services/auth.service';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const token = authService.getToken();
        const user = authService.getCurrentUser();

        if (token && user) {
            const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://127.0.0.1:5000', {
                auth: {
                    token,
                },
            });

            newSocket.on('connect', () => {
                console.log('Socket connected');
                setConnected(true);
                // Join user's personal room
                newSocket.emit('join', user._id);
            });

            newSocket.on('disconnect', () => {
                console.log('Socket disconnected');
                setConnected(false);
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, []);

    const value = {
        socket,
        connected,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
