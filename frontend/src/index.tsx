import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './components/util/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { NotificationContainerProvider } from './store/notification-context';
import { ProjectContextProvider } from './store/project-context';

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <AuthContextProvider>
            <NotificationContainerProvider>
                <ProjectContextProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ProjectContextProvider>
            </NotificationContainerProvider>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
