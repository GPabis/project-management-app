import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyles from './components/util/GlobalStyles';
import { BrowserRouter } from 'react-router-dom';
import AuthContext, { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyles />
        <AuthContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
