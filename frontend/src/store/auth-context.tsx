import { useEffect } from 'react';
import { useState, createContext } from 'react';
import Cookies from 'universal-cookie';
import { IAuthContext, IUserData } from '../types/user-types';

const AuthContext = createContext<IAuthContext>({
    username: '',
    email: '',
    _id: '',
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
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const userIsLoggedIn = !!token;

    useEffect(() => {
        const loadUserData = async () => {
            if (userIsLoggedIn && token) {
                const response = await fetch('http://localhost:8080/login', {
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    logoutHandler();
                }

                const { username, email, _id }: IUserData = await response.json();
                setUsername(username);
                setEmail(email);
                setUserId(_id);
            }
        };
        loadUserData();
    }, [token, userIsLoggedIn]);

    const login = (token: string) => {
        const dateNow = new Date();
        const expires = new Date(new Date(dateNow).setHours(dateNow.getHours() + 2));
        cookies.set('project-token', token, { path: '/', expires: expires });
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
        setToken(null);
        setUsername(null);
        setEmail(null);
    };

    const contextValue: IAuthContext = {
        token: token,
        username,
        email,
        _id: userId,
        isLoggedIn: userIsLoggedIn,
        login,
        setUsernameHandler,
        setEmailHandler,
        logout: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
