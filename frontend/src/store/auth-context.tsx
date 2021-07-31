import { useEffect } from 'react';
import { useState, createContext } from 'react';
import Cookies from 'universal-cookie';

interface IAuthContext {
    username: string | null;
    email: string | null;
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string, username: string, email: string) => void;
    setUsernameHandler: (username: string) => void;
    setEmailHandler: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
    username: '',
    email: '',
    token: '',
    isLoggedIn: false,
    login: (token: string, username: string, email: string) => {},
    setUsernameHandler: (username: string) => {},
    setEmailHandler: (email: string) => {},
    logout: () => {},
});

export const AuthContextProvider: React.FC = ({ children }) => {
    const cookies = new Cookies();

    const [token, setToken] = useState<string | null>(cookies.get('project-token') || null);
    const [username, setUsername] = useState<string | null>(cookies.get('project-username') || null);
    const [email, setEmail] = useState<string | null>(cookies.get('project-email') || null);

    const userIsLoggedIn = !!token;

    const login = (token: string, username: string, email: string) => {
        const dateNow = new Date();
        const expires = new Date(new Date(dateNow).setHours(dateNow.getHours() + 2));
        cookies.set('project-token', token, { path: '/', expires: expires });
        cookies.set('project-username', username, { path: '/', expires: expires });
        cookies.set('project-email', email, { path: '/', expires: expires });
        setToken(token);
    };

    const setUsernameHandler = (username: string) => {
        setUsername(username);
    };

    const setEmailHandler = (email: string) => {
        setEmail(email);
    };

    const logoutHandler = () => {
        cookies.remove('project-token', { path: '/' });
        cookies.remove('project-username', { path: '/' });
        cookies.remove('project-email', { path: '/' });
        setToken(null);
        setUsername(null);
        setEmail(null);
    };

    const contextValue: IAuthContext = {
        token: token,
        username,
        email,
        isLoggedIn: userIsLoggedIn,
        login,
        setUsernameHandler,
        setEmailHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
