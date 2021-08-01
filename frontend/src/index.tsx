import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './components/util/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { NotificationContainerProvider } from './store/notification-context';

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <AuthContextProvider>
            <NotificationContainerProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </NotificationContainerProvider>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
