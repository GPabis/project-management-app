import NavElement from './NavElement';
import Nav from './Nav';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory, NavLink } from 'react-router-dom';

const UserNav = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const logoutHadnler = () => {
        authCtx.logout();
        history.push('/');
    };

    return (
        <Nav>
            <NavElement>
                <NavLink to="/dashboard/create-project">Create Project</NavLink>
            </NavElement>
            <NavElement>
                <NavLink to="/dashboard/projects">Your Projects</NavLink>
            </NavElement>
            <NavElement>
                <button onClick={logoutHadnler}>Logout</button>
            </NavElement>
        </Nav>
    );
};

export default UserNav;
