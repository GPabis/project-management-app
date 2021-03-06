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
import CreateProject from './components/Dashboard/CreateProject';
import Notification from './components/Notification';
import AddTeammate from './components/Project/AddTeammate';
import AddTask from './components/Project/AddTask';
import Task from './components/Project/Task';
import DeleteProject from './components/Project/DeleteProject';
import EditTask from './components/Project/Task/EditTask';

const App: FC = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <>
            <Notification />
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

                    <Route path="/dashboard/projects" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <YourProjects />}
                    </Route>

                    <Route path="/dashboard/projects/:id/invite" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <AddTeammate />}
                    </Route>

                    <Route path="/dashboard/projects/:id/add-task" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <AddTask />}
                    </Route>

                    <Route path="/dashboard/create-project" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <CreateProject />}
                    </Route>

                    <Route path="/dashboard/projects/:id" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <SingleProject />}
                    </Route>

                    <Route path="/dashboard/projects/:id/delete" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <DeleteProject />}
                    </Route>

                    <Route path="/dashboard/projects/:id/task/:taskId" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <Task />}
                    </Route>

                    <Route path="/dashboard/projects/:id/task/:taskId/edit" exact>
                        {!isLoggedIn ? <Redirect to="/" /> : <EditTask />}
                    </Route>
                </main>
            </Header>
        </>
    );
};

export default App;
