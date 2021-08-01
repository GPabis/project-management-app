import React, { createContext } from 'react';
import { useState } from 'react';

interface INotificationContext {
    error: boolean;
    messages: string[];
    setNotification: (error: boolean, messages: string[]) => void;
}

const NotificationContext = createContext<INotificationContext>({
    error: false,
    messages: [],
    setNotification: () => {},
});

export const NotificationContainerProvider: React.FC = ({ children }) => {
    const [error, setError] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    const setNotification = (error: boolean, messages: string[]) => {
        setError(error);
        setMessages([...messages]);
    };

    const contextValue = {
        error,
        messages,
        setNotification,
    };

    return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
