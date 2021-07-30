import Header from './components/Header';
import { FC } from 'react';
import Register from './components/Auth/Register';
import { Redirect, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

const App: FC = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <Header>
            <main>
                <Route path="/register" exact>
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <Register />}
                </Route>

                <Route path="/login" exact>
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
                </Route>

                <Route path="/dashboard" exact>
                    {!isLoggedIn ? <Redirect to="/" /> : <h1>Dashboard. Welcome {authCtx.username}</h1>}
                </Route>
            </main>
        </Header>
    );
};

export default App;
