import Header from './components/Header';
import { FC } from 'react';
import Register from './components/Auth/Register';
import { Redirect, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import Welcome from './components/WelcomePage';
import Dashboard from './components/Dashboard';
import YourProjects from './components/Dashboard/YourProjects';
import SingleProject from './components/Project';
import CreateProject from './components/CreateProject/CreateProject';

const App: FC = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <Header>
            <main>
                <Route path="/" exact>
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <Welcome />}
                </Route>

                <Route path="/register" exact>
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <Register />}
                </Route>

                <Route path="/login" exact>
                    {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
                </Route>

                <Route path="/dashboard" exact>
                    {!isLoggedIn ? <Redirect to="/" /> : <Dashboard />}
                </Route>

                <Route path="/dashboard/your-projects" exact>
                    {!isLoggedIn ? <Redirect to="/" /> : <YourProjects />}
                </Route>

                <Route path="/dashboard/your-projects/:id" exact>
                    {!isLoggedIn ? <Redirect to="/" /> : <SingleProject />}
                </Route>

                <Route path="/dashboard/create-project" exact>
                    {!isLoggedIn ? <Redirect to="/" /> : <CreateProject />}
                </Route>
            </main>
        </Header>
    );
};

export default App;
