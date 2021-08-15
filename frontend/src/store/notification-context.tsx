import React, { createContext } from 'react';
import { useState } from 'react';
import { INotificationContext } from '../types/global-types';

const NotificationContext = createContext<INotificationContext>({
    error: false,
    messages: '',
    setNotification: () => {},
});

export const NotificationContainerProvider: React.FC = ({ children }) => {
    const [error, setError] = useState(false);
    const [messages, setMessages] = useState('');

    const setNotification = (error: boolean, message: string) => {
        setError(error);
        setMessages(message);
    };

    const contextValue = {
        error,
        messages,
        setNotification,
    };

    return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
